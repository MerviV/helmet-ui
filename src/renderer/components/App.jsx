import React, {useState, useEffect, useRef} from 'react';
import Store from 'electron-store';

const defaultProjectPath = require('os').homedir();

const App = ({helmetUIVersion, versions, searchEMMEPython}) => {

  // Global settings
  const [isSettingsOpen, setSettingsOpen] = useState(false); // whether Settings -dialog is open
  const [isProjectRunning, setProjectRunning] = useState(false); // whether currently selected Project is running
  const [emmePythonPath, setEmmePythonPath] = useState(undefined); // file path to EMME python executable
  const [helmetScriptsPath, setHelmetScriptsPath] = useState(undefined); // folder path to HELMET model system scripts
  const [projectPath, setProjectPath] = useState(undefined); // folder path to scenario configs, default homedir

  // Global settings store contains "emme_python_path", "helmet_scripts_path", and "project_path".
  const globalSettingsStore = useRef(new Store());

  const _setEMMEPythonPath = (newPath) => {
    setEmmePythonPath(newPath);
    globalSettingsStore.current.set('emme_python_path', newPath);
  };

  const _setHelmetScriptsPath = (newPath) => {
    setHelmetScriptsPath(newPath);
    globalSettingsStore.current.set('helmet_scripts_path', newPath);
  };

  const _setProjectPath = (newPath) => {
    setProjectPath(newPath);
    globalSettingsStore.current.set('project_path', newPath);
  };

  useEffect(() => {
    // Search for EMME's Python if not set in global store (default win path is %APPDATA%, should remain there [hidden from user])
    if (!globalSettingsStore.current.get('emme_python_path')) {
      const [found, pythonPath] = searchEMMEPython();
      if (found) {
        if (confirm(`Python ${versions.emme_python} löytyi sijainnista:\n\n${pythonPath}\n\nHaluatko käyttää tätä sijaintia?`)) {
          globalSettingsStore.current.set('emme_python_path', pythonPath);
        }
      } else {
        alert(`Emme ${versions.emme_system} ja Python ${versions.emme_python} eivät löytyneet oletetusta sijainnista.\n\nMääritä Pythonin sijainti Asetukset-dialogissa.`);
      }
    }
    // Copy existing global store values to state
    setEmmePythonPath(globalSettingsStore.current.get('emme_python_path'));
    setHelmetScriptsPath(globalSettingsStore.current.get('helmet_scripts_path'));
    setProjectPath(globalSettingsStore.current.get('project_path'));
  }, []);

  return (
    <div className={"App" + (isProjectRunning ? " App--busy" : "")}>

      {/* Pop-up global settings dialog with overlay behind it */}
      <div className="App__settings" style={{display: isSettingsOpen ? "block" : "none"}}>
        <Settings
          emmePythonPath={emmePythonPath}
          helmetScriptsPath={helmetScriptsPath}
          projectPath={projectPath}
          closeSettings={() => setSettingsOpen(false)}
          setEMMEPythonPath={_setEMMEPythonPath}
          setHelmetScriptsPath={_setHelmetScriptsPath}
          setProjectPath={_setProjectPath}
        />
      </div>

      {/* UI title bar, app-version, etc. */}
      <div className="App__header">
        Helmet 4.0
        &nbsp;
        <span className="App__header-version">{`UI v${helmetUIVersion}`}</span>
        <button className="App__open-settings-btn"
                style={{display: isSettingsOpen ? "none" : "block"}}
                onClick={(e) => setSettingsOpen(true)}
                disabled={isProjectRunning}
        >
          Asetukset
        </button>
      </div>

      {/* HELMET Project -specific content, including runtime- & per-scenario-settings */}
      <div className="App__body">
        <HelmetProject
          emmePythonPath={emmePythonPath}
          helmetScriptsPath={helmetScriptsPath}
          projectPath={projectPath ? projectPath : defaultProjectPath}
          signalProjectRunning={setProjectRunning}
        />
      </div>
    </div>
  )
};