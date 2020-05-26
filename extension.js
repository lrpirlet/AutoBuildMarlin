/**
 * Auto Build Marlin
 * extension.js
 *
 * NOTES: For 'command failed' check declarations!
 *        Be sure to escape backslashes in "new Regex()"
 *
 * TODO: Standardize startup sequence. Currently this extension intializes before the
 *       action bar icon is selected to reveal empty list-views with button icons,
 *       so the Welcome View can be given the correct state for the open workspace.
 *
 *       Opening a new folder or a new workspace actually reloads the whole window and
 *       starts the extension over from the top. So, there is no need to monitor the
 *       state of the currently open workspace if there's simply no folder open at all.
 *       The state of the Welcome View will be set correctly on the next startup.
 *
 *       That said, if a folder is open in the workspace, it may be watched to see if
 *       the content changes so that it becomes a valid Marlin installation, as might
 *       often occur when using Git externally.
 */

'use strict';

const vscode = require('vscode'),
       proto = require('./proto'),
         abm = require('./abm/abm'),
          vc = vscode.commands;

exports.activate = (context) => {

  const cs = context.subscriptions;

  cs.push(vc.registerCommand('abm.build',     () => { abm.run_command('build');     }));
  cs.push(vc.registerCommand('abm.upload',    () => { abm.run_command('upload');    }));
  cs.push(vc.registerCommand('abm.traceback', () => { abm.run_command('traceback'); }));
  cs.push(vc.registerCommand('abm.clean',     () => { abm.run_command('clean');     }));
  cs.push(vc.registerCommand('abm.config',    () => { abm.run_command('config');    }));
  cs.push(vc.registerCommand('abm.show',      () => { abm.run_command();            }));
  cs.push(vc.registerCommand('abm.sponsor',   () => { abm.sponsor();                }));

  abm.init(context, vscode);
  abm.validate();
  abm.watchAndValidate();
  abm.set_context('active', true);

  if (abm.pref_show_on_startup()) setTimeout(abm.run_command, 1000);
};

exports.deactivate = () => { abm.set_context('active', false); };
