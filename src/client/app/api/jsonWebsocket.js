class jsonWebsocket {
	constructor(url){
		this.url = url;
		this.ready = false;
		this.connection = null;
		this.messages = null;
	}
	
	hasWebSocket() {
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		if (window.WebSocket) {
			return true;
		}
		return false;
	}

	connect() {
		if (this.connection) return;
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		this.connection = new WebSocket(this.url);
		this.messages = [];
		
		this.connection.onopen = () => {
			this.ready = true;
			try {
				this.onOpen();
				for	(var i = 0; i < this.messages.length; i++) {
					this.connection.send(this.messages[i]);
				}
				this.messages = null;
			} catch (e) {
				console.log('Failed to open:', e);
			}
		}
		this.connection.onerror = (error) => {
			try {
				this.onError(error);
			} catch (e) {
				console.log('Failed to report error:', e);
			}
		}
		this.connection.onmessage = (message) => {
			try {
				var json = JSON.parse(message.data);
				console.log('Message:', message.data);
				this.onMessage(json);
			} catch (e) {
				console.log('WebSocket Error: Invalid JSON:', message.data);
			}
		}
		this.connection.onclose = () => {
			this.ready = false;
			this.connection = null;
			this.messages = null;
			this.onClose();
		}
	}
	send(json) {
		var message = JSON.stringify(json);
		if (this.ready) {
			this.connection.send(message);
		} else if (this.message !== null) {
			this.messages.push(message);
		} else {
			throw "No Connection is Open";
		}
	}
	close() {
		this.ready = false;
		this.connection.close();
	}
	isReady() {
		return this.ready;
	}
	
	onOpen() {}
	onError(error) {}
	onMessage(json) {}
	onClose() {}
}

export default jsonWebsocket;