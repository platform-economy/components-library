const PACKAGE_PREFIX = 'ui-elements';
const getFullPackageName = (packageName) => `${PACKAGE_PREFIX}-${packageName}`;

module.exports = {
  commands: {
    'create:package': {
      rootPath: './packages',
      vars: {
        packagePrefix: `${PACKAGE_PREFIX}-`
      },
      prompts: ({ getDirectories }) => [
        {
          message: 'Name of new package:',
          name: 'package_name',
          type: 'input',
          validate: (value, answers) => {
            if (getDirectories().includes(value)) {
              return 'Package exists';
            }

            if (value.indexOf(PACKAGE_PREFIX) > -1) {
              return `Do not use "${PACKAGE_PREFIX}" in package name`;
            }

            return value.match(/^[a-z/-]+$/gs) ? true : 'Package name invalid';
          }
        }
      ],
      actions: [
        { type: 'create_dir', path: ({ answers: { package_name } }) => [getFullPackageName(package_name)] },
        { type: 'create_dir', path: ({ answers: { package_name } }) => [getFullPackageName(package_name), 'components'] },
        { type: 'create_file', path: ({ answers: { package_name } }) => [getFullPackageName(package_name)], name: 'index.ts' },
        {
          type: 'copy_templates', list: {
            'new_package/package.json.hbs': ({ answers: { package_name } }) => `${getFullPackageName(package_name)}/package.json`,
            'new_package/README.md.hbs': ({ answers: { package_name } }) => `${getFullPackageName(package_name)}/README.md`
          }
        }
      ]
    },
    'create:component': {
      rootPath: './packages',
      prompts: ({ getDirectories, capitalize }) => [
        {
          message: 'Select component package:',
          name: 'package_name',
          type: 'list',
          choices: getDirectories()
        },

        {
          message: 'Name of new component:',
          name: 'component_name',
          type: 'input',
          validate: (value, { package_name }) => {
            if (getDirectories([package_name, 'components']).includes(value)) {
              return 'Component exists!';
            }

            return value.match(/^[a-zA-Z]+$/gs) ? true : 'Component name invalid';
          },
          filter: value => capitalize(value)
        }
      ],
      actions: [
        {
          type: 'edit_file',
          path: ({ answers: { package_name } }) => [package_name],
          name: 'index.ts',
          onBody: ({ answers: { component_name } }) => ({ body }, parse) => {
            body.push(parse(`export * from './components/${component_name}'`).body[0]);
          }
        },

        { type: 'set_root_path', path: ({ answers: { package_name, component_name } }) => [package_name, 'components', component_name] },
        { type: 'create_dir', path: '__tests__' },
        { type: 'create_file', name: 'index.ts' },

        { type: 'copy_templates', list: {
          'new_component/index.ts.hbs': 'index.ts',
          'new_component/test.tsx.hbs': ({answers: { component_name }}) => `__tests__/${component_name}.test.tsx`,
          'new_component/component.tsx.hbs': ({ answers: { component_name } }) => `${component_name}.tsx`,
          'new_component/stories.tsx.hbs': ({ answers: { component_name } }) => `${component_name}.stories.tsx`,
        }},
      ]
    }
  }
}
