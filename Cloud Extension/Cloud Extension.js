//
// Sample DroiScript IDE Extension project.
//

function OnStart()
{
    //Set extension name.
    var extName = "Cloud"
    
    //Set to right or left side extension.
    var side = "Left" //"Left"
    
    //Install extension files.
    app.MakeFolder( "/sdcard/DroidScript/Extensions/"+extName+"/"+side+"" )
    app.CopyFile( "extension.html", "/sdcard/DroidScript/Extensions/"+extName+"/"+side+"/"+extName+".html" )
    app.CopyFile( "main.js", "/sdcard/DroidScript/Extensions/"+extName+"/"+side+"/"+"main.js" )
    app.CopyFile( "extension.json", "/sdcard/DroidScript/Extensions/"+extName+"/"+side+"/"+extName+".json" )
    
    app.ShowPopup( "Reload your browser frame" )
    setTimeout( function(){app.Exit()}, 2000 )
}

