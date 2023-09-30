how to do it:

- await vscode.workspace.getConfiguration().update('editor.renderWhitespace', 'selection', vscode.ConfigurationTarget.Global);
- Json language feature has this: in its code: (Link)[https://github.com/microsoft/vscode/blob/e8fa82b65fa98df5510d6790e08e781f2d47de41/extensions/json-language-features/server/src/jsonServer.ts#L236]

```
    	const settings = <Settings>change.settings;
		runtime.configureHttpRequests?.(settings?.http?.proxy, !!settings.http?.proxyStrictSSL);
		jsonConfigurationSettings = settings.json?.schemas;
		validateEnabled = !!settings.json?.validate?.enable;
		keepLinesEnabled = settings.json?.keepLines?.enable || false;
```

1. scan the project. See if it's applicable. (it's a backstage project)
1. add another command to backstage to cat the json schema. (it has config:docs but it will redirect to web)
1. use the dumped json schema from backstage to populate a schema file.
1. update the association of app-info.json or yaml via the command given above (first bullet point).
   - (check associcating json file would work for yaml or not)
1. the second bullet point should update the association and voila!

Some things to consider:

1. how to detect plugin change
1. how "scan the project"
1. how to do this in a workspace environment.
