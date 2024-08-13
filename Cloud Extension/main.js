//*******************************
// DroidScript Cloud Extension.
//*******************************

class Main extends App {
    
    onStart() {
        
        //Creates main layout.
        this.main = ui.addLayout( "main", "Linear", "FillXY,VCenter")
        this.main.backColor = "#e0e0e0"

        // Adds a tab component to the main layout.
        var tabs = ["Files", "Apps", "Database"]
        this.tabs = ui.addTabs(this.main, tabs, "", 1, 1 )
        this.tabs.setOnChange( this.onChange )

        //Get the first tab and add a webview control
        this.tab1 = this.tabs.getLayout(0)
        this.web1 = ui.addWebView(this.tab1, "", "", 1, 1)

        //Get the second tab and add a webview control.
        this.tab2 = this.tabs.getLayout(1)
        this.web2 = ui.addWebView(this.tab2, "", "", 1, 1)

        //Get the third tab and add a webview control
        this.tab3 = this.tabs.getLayout(2)
        this.web3 = ui.addWebView(this.tab3, "", "", 1, 1)
        
        //Initialise the extension.
        ext.Init()
    }

    onChange(tab, index) {
        //ui.showPopup( tab + " : Index " + index)
    }
}


//Called when extension is loaded and ready.
function ext_OnReady() {
    console.log( "ext_OnReady" )
}

//Handle extension tab switches us.
function ext_OnSelect( name ) {
	console.log( "ext_OnSelect" )
	
	console.log( "cloudKey: " + ext.cloudKey )
	var ss = ext.cloudKey.split("-")
	var user = ss.shift()
	var key = ss.join("-")
	 
	if( key ) {
    	if( main.web1.url=="about:blank" ) main.web1.url = "https://"+user+"-fs.droidscript.cloud/?key=" + key
    	if( main.web2.url=="about:blank" ) main.web2.url = "https://"+user+"-apps.droidscript.cloud/?key=" + key
        if( main.web3.url=="about:blank"  ) main.web3.url = "https://"+user+"-db.droidscript.cloud/_/?key=" + key
                    + "#/login?demoEmail="+user+"@droidscript.cloud&demoPassword=" + key
	}
	else {
	    var isMobile = screen.width < 621
	    var msg = ext.premium=="+" ? "Please add your Cloud Key to settings" : "Premium<sup>+</sup> required"
	    var html = `<html> <body> <div style="position:absolute; top:40%; left:`+(isMobile?20:40)+`%; color:#7b8389; font-size:1.6em;">
    	   ` + msg + ` </div> </body></html> `
    	main.web1.html = html; main.web2.html = html; main.web3.html = html
	}
} 

//Handle extension tab switches away.
function ext_OnDeselect( name ) {
     console.log("ext_OnDeselect" )
}

//Handle IDE connect.
function ext_OnConnect(){
    console.log( "ext_OnConnect" )
    ext_OnReady()
}

//Handle IDE disconnect.
function ext_OnDisconnect(){
    console.log( "ext_OnDisconnect" )
    ext_OnReady()
}

//Handle IDE project change.
function ext_OnProject( name ){
    console.log( "ext_OnProject: " + name )
    ext_OnReady()
}

//Handle messages posted from other extensions.
function ext_OnPost( msg ){
    console.log( "ext_OnPost: " + msg )
}


