declare namespace gapi.savetodrive {

  type RenderParameters = {
    src: string;
    filename: string;
    sitename: string;
  };

  function render(
    container: string|HTMLElement,
    parameters: RenderParameters,
  ): void;
}
