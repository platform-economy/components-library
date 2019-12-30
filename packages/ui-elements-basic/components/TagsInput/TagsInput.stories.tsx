import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';

import { TagsInput, TagsInputProps } from './index';
import { TagType } from '../Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

const exampleInfo = `
**description or documentation about TagsInput component**

*supports markdown*
`;

const tagsArray = [
  { id: '01', title: 'Tag with text', content: 'Text Tag' },
  { id: '02', title: 'Tag with whale emoji', content: 'Emoji Tag 🐳' },
  { id: '03', title: 'Tag with anchor icon', content: <FontAwesomeIcon icon={faAnchor}/> },
  { id: '04', title: 'Tag with strong', content: <span>This is <strong>Bold</strong> Text</span> },
];

const validator = (query: string) => {
  if (/\S+@\S+\.\S+/.test(query)) { // returns true if email follows this pattern
    return true;
  }
  return false;
};

storiesOf('ui-elements-basic/TagsInput', module)
  .add('default', () => (
    <div style={{ width: `${number('Width', 400)}px` }}>
      <TagsInput
        sourceTags={tagsArray}
        placeholder="Select tags"
        clearIcon={<FontAwesomeIcon className="removeIcon" icon="times" />}
        optionsList={boolean('Options list', false)}
        noTagsMsg="No Tags to show"
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  )
  .add('with custom tags and validation', () => (
    <div style={{ width: `${number('Width', 400)}px` }}>
      <TagsInput
        sourceTags={[]}
        placeholder="Type in emails"
        clearIcon={<FontAwesomeIcon className="removeIcon" icon="times" />}
        optionsList={boolean('Options list', false)}
        noTagsMsg="No Tags to show"
        enableCustomTags={true}
        inputValidator={validator}
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  )
  .add('external tag provider', () => {

    class TagsInputExternalAutocompleter extends React.Component<
      TagsInputProps,
      { sourceTags: TagType[]; loadingData:boolean }>
    {
      constructor(props: TagsInputProps) {
        super(props);
        this.state = { sourceTags:[], loadingData:false };
        this.onQueryChange = this.onQueryChange.bind(this);
      }
      private tagsArrayBig:TagType[] = [
        { id:'Zeus', title:'Zeus' },
        { id:'Hera', title:'Hera' },
        { id:'Posejdon', title:'Posejdon' },
        { id:'Hestia', title:'Hestia' },
        { id:'Hades', title:'Hades' },
        { id:'Demeter', title:'Demeter' },
        { id:'Apollo', title:'Apollo' },
        { id:'Artemida', title:'Artemida' },
        { id:'Afrodyta', title:'Afrodyta' },
        { id:'Hefajstos', title:'Hefajstos' },
        { id:'Ares', title:'Ares' },
        { id:'Atena', title:'Atena' },
        { id:'Dionizos', title:'Dionizos' },
        { id:'Persefona', title:'Persefona' },
        { id:'Hebe', title:'Hebe' },
        { id:'Helios', title:'Helios' },
        { id:'Selene', title:'Selene' },
        { id:'Eos', title:'Eos' },
        { id:'Iris', title:'Iris' },
        { id:'Eris', title:'Eris' },
        { id:'Eros', title:'Eros' },
        { id:'Ejlejtyja', title:'Ejlejtyja' },
        { id:'Hermes', title:'Hermes' },
        { id:'Nike', title:'Nike' },
        { id:'Temida', title:'Temida' },
        { id:'Tyche', title:'Tyche' },
        { id:'Tanatos', title:'Tanatos' },
        { id:'Hekate', title:'Hekate' },
        { id:'Pan', title:'Pan' },
        { id:'Asklepios', title:'Asklepios' },
        { id:'Nemezis', title:'Nemezis' },
        { id:'Hypnos', title:'Hypnos' },
        { id:'Eol', title:'Eol' },
        { id:'Boreasz', title:'Boreasz' },
        { id:'Zefir', title:'Zefir' },
        { id:'Notos', title:'Notos' },
        { id:'Euros', title:'Euros' },
        { id:'Amfitryta', title:'Amfitryta' },
        { id:'Charyty', title:'Charyty' },
        { id:'Muzy', title:'Muzy' },
        { id:'Mojry', title:'Mojry' },
        { id:'Hory', title:'Hory' },
        { id:'Nimfy', title:'Nimfy' },
        { id:'Chloris', title:'Chloris' },
        { id:'Enyo', title:'Enyo' },
        { id:'Syleni', title:'Syleni' },
      ];
      private getFilterTags:(query?:string) => Promise<TagType[]> = (query?:string) => {
        const gettingData = new Promise(
          (resolve: (value: TagType[]) => void, reject: (reason?: unknown) => void) => {
            const filter:TagType[] = this.tagsArrayBig.filter((tag:TagType) => {
              if (query == null) {
                return true;
              }
              return ~tag.id.indexOf(query);
            });
            const result = filter.slice(0, 10);
            setTimeout(() => resolve(result), 1000);
          });
        return gettingData;
      }
      private onQueryChange:(query?:string) => void = (query?:string) => {
        this.setState({ loadingData:true });
        this.getFilterTags(query).then((result) => {
          this.setState({ sourceTags:result, loadingData:false });
        });
      }
      componentDidMount() {
        this.onQueryChange();
      }
      render() {
        return (
          <div style={{ width: `${number('Width', 400)}px` }}>
            <TagsInput
              sourceTags={this.state.sourceTags}
              onTagsQueryChange={this.onQueryChange}
              placeholder="Select tags"
              clearIcon={<FontAwesomeIcon className="removeIcon" icon="times" />}
              optionsList={boolean('Options list', false)}
              noTagsMsg="No Tags to show"
              loading={this.state.loadingData}
            />
          </div>
        );
      }
    }

    return (<TagsInputExternalAutocompleter/>);
  });
