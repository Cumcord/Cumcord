/**
 * @name CumcordLoader
 * @author Drake
 * @version 0.6.9
 * @description Load Cumcord
 * @website https://github.com/Cumcord/Cumcord
 */

module.exports = class CumcordLoader {
    async start() {
    	console.log("Loaded!")
    	const response = await fetch("https://raw.githubusercontent.com/Cumcord/Cumcord/stable/dist/build.js");
		const text = await response.text()
    	eval(text);
    } 
    stop() {
    	console.log("Unloaded!")
    	cumcord.uninject();
    }
}
