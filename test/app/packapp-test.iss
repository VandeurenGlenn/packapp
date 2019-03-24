#define MyAppName "Packapp Test"
#define MyAppVersion "0.1.0"
#define MyAppPublisher "Glenn Vandeuren"
#define MyAppURL "https://github.com/vandeurenglenn/packapp"
;#define MyAppVBSName "we-talk.vbs"
#define MyAppExeName "packapp-test.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{C9613C4C-1619-4D8F-9B1E-54EC1DBD9950}
;SignTool=signtool
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
OutputDir=..\..\
OutputBaseFilename={#MyAppName}-setup
SolidCompression=yes
PrivilegesRequired=none
InternalCompressLevel=ultra64
ShowTasksTreeLines=false
DisableReadyPage=True
DisableReadyMemo=True
DisableFinishedPage=True
UsePreviousSetupType=False
UsePreviousTasks=False
UsePreviousLanguage=False
FlatComponentsList=False
AlwaysShowComponentsList=False
ShowComponentSizes=False

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"



[Files]
Source: "..\executables\main-win.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}.exe"; Flags: ignoreversion

Source: "node_modules\opn\xdg-open"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
[Tasks]
;Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: checkablealone
;Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
;Name: "{userdesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppVBSName}";

;[Run]
;Filename: "{userdesktop}\{#MyAppName}.lnk"; Flags: nowait skipifsilent runascurrentuser shellexec; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"
