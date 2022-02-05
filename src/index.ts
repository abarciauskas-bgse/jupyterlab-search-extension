import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { IFrameWidget } from './widgets';
import { ICommandPalette } from '@jupyterlab/apputils';
import '../style/index.css';
/**
 * Initialization data for the command palette example.
 */
 const extension: JupyterFrontEndPlugin<void> = {
  id: 'search-command',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    const { commands } = app;
    let widget: IFrameWidget;

    // Add a command
    const open_command = 'iframe:open';
    commands.addCommand(open_command, {
      label: 'Open Search',
      isEnabled: () => true,
      execute: args => {
        // Only allow user to have one EDSC window
        if (widget == undefined) {
            widget = new IFrameWidget('https://search.maap-project.org');
            app.shell.add(widget, 'main');
            app.shell.activateById(widget.id);
        } else {
            // if user already has EDSC, just switch to tab
            app.shell.add(widget, 'main');
            app.shell.activateById(widget.id);
        }
      }
    });
    palette.addItem({command: open_command, category: 'Search'});
  },
};

export default extension;
