import React from 'react';
import path from "path";

const Settings = ({
  emmePythonPath, setEMMEPythonPath,
  helmetScriptsPath, setHelmetScriptsPath,
  projectPath, setProjectPath,
  closeSettings,
}) => {
  return (
    <div className="Settings">

      <div className="Settings__overlay">{/* Dark background overlay */}</div>

      <div className="Settings__dialog">
        <div className="Settings__dialog-heading">Asetukset</div>
        <div className="Settings__dialog-input-group">
          <span className="Settings__pseudo-label">Emme Python</span>
          <label className="Settings__pseudo-file-select" htmlFor="hidden-input-emme-python-path">
            {emmePythonPath ? path.basename(emmePythonPath) : "Valitse.."}
          </label>
          <input className="Settings__hidden-input"
                 id="hidden-input-emme-python-path"
                 type="file"
                 accept=".exe"
                 onChange={(e) => setEMMEPythonPath(e.target.files[0].path)}
          />
        </div>
        <div className="Settings__dialog-input-group">
          <span className="Settings__pseudo-label">Helmet Scripts</span>
          <label className="Settings__pseudo-file-select" htmlFor="hidden-input-helmet-scripts-path">
            {helmetScriptsPath ? path.basename(helmetScriptsPath) : "Valitse.."}
          </label>
          <input className="Settings__hidden-input"
                 id="hidden-input-helmet-scripts-path"
                 type="file"
                 webkitdirectory=""
                 directory=""
                 onChange={(e) => setHelmetScriptsPath(e.target.files[0].path)}
          />
        </div>
        <div className="Settings__dialog-input-group">
          <span className="Settings__pseudo-label">Projektin kansiopolku (oletusarvoisesti kotihakemistosi)</span>
          <label className="Settings__pseudo-file-select" htmlFor="hidden-input-project-path">
            {projectPath ? path.basename(projectPath) : "Valitse.."}
          </label>
          <input className="Settings__hidden-input"
                 id="hidden-input-project-path"
                 type="file"
                 webkitdirectory=""
                 directory=""
                 onChange={(e) => setProjectPath(e.target.files[0].path)}
          />
        </div>
        <div className="Settings__dialog-controls">
          <button onClick={(e) => closeSettings()}>
            Sulje
          </button>
        </div>
      </div>

    </div>
  )
};