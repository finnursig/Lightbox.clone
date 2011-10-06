var LightBoxClone = new Class({
	Version: 0.5,
	Implements: [Options, Events],
	
	options: {
		rel: 'lightbox',
		speed: 300,
		margin: 50,
		resize: true,
		overlay: false,
		overlayOpacity: 0.8,
		overlayColor: '#000',
		onLoad: function(){},
		onOpen: function(){},
		onClose: function(){},
		onZoomIn: function(){},
		onZoomOut: function(){}
	},
	
	assets: {
		images: {
			loading: 'data:image/gif;base64,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',
			next: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGRjdERTIwM0Q0RTExRTBCMDEzREYyQzQ2NUYyRUIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGRjdERTIxM0Q0RTExRTBCMDEzREYyQzQ2NUYyRUIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkZGN0RFMUUzRDRFMTFFMEIwMTNERjJDNDY1RjJFQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkZGN0RFMUYzRDRFMTFFMEIwMTNERjJDNDY1RjJFQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ZFfQeAAAAw0lEQVR42uzZYQqAIAwF4Lk6WDezm1uEBxDa3uZ4A6k/UR+lPk1EpL9tbN56myfbl0qRIoQQQgghhBBCKkHOPxePsRbTWmu538jqA66CQz+tLBiTPpIBY9bZozGmo1Ykxnz4jcK4zCMRGLcJEY1xndmRGPeIgsJAshYCAwuN3hgYxDtgagUEBIKK+loB4QpBL7q0AsIFErX81QoIU0j0RoRWQJhAsmwJaQXEdw/hz1BCCCGEEEIIISRdHfN4be64HwEGABBCfvClIXHwAAAAAElFTkSuQmCC',
			previous: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5NjlDMzNFM0Q0RTExRTBCMTNEQUEyNjJDMTUxMjcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5NjlDMzNGM0Q0RTExRTBCMTNEQUEyNjJDMTUxMjcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njk2OUMzM0MzRDRFMTFFMEIxM0RBQTI2MkMxNTEyNzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njk2OUMzM0QzRDRFMTFFMEIxM0RBQTI2MkMxNTEyNzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4W6L5BAAAAwklEQVR42uzZ0Q2AIAwE0KIO5ma6OfrBAATa3kGuSaN/+gJqW83Mnj/r4vmUdrJ8HLZJCCKIIIIIIoggO0GujIvU2lfOlVJ4VyQDEQ7JQoRCMhFhkGxECASBcIegEK4QJMINgka4QBgQ0xAWxBSECTEMYUMMQ3pvsBcM3VpsmKmHnQkz/fplwbh8EBkwbiUKGuNaNCIx7mU8ChPSWCEwYa1uNiZ0+JCJCR8HZWH0M1QQQQQRRBBBBCGMsx3vxR3vJ8AA2FF+8A/14hMAAAAASUVORK5CYII=',
			close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5MjhDMTQ0M0Q0RTExRTBCRTEyODFEN0REQ0NCMUFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5MjhDMTQ1M0Q0RTExRTBCRTEyODFEN0REQ0NCMUFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzkyOEMxNDIzRDRFMTFFMEJFMTI4MUQ3RERDQ0IxQUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzkyOEMxNDMzRDRFMTFFMEJFMTI4MUQ3RERDQ0IxQUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6aLGTtAAAAdUlEQVR42mJgYGCoB+L/NMD1jFAGTQATAw3BqOGD0PD///+TJE604TAD0A3CJU6S4YyMjHgNRJbHqp+YTITNhYQMJjpC0Q0ixmCiDccV5lRNLdjigOLUgmwwKRYQlVpwhTlVUsto2TJqOBgwQ2kHGpjdABBgAAt+RsgHobKeAAAAAElFTkSuQmCC'
		},
		elements: {
			next: null,
			previous: null,
			close: null,
			text: null,
			overlay: null
		}
	},
	
	gallerys: {},
	images: [],
	
	initialize: function(options){
		this.setOptions(options);
		
		this.buildAssets();
		
		$$('a[rel^='+ this.options.rel +']').each(function(image){
			this.addImage(image);
		}.bind(this));
		
		// Global zoomOut Event
		document.addEvent('click',function(e){
			if( !e.target.getParents().contains( this.wrap ) ) {
				for(var i = 0; i < this.images.length; i++){
					if(this.images[i].visible){
						this.zoomOut(this.images[i]);
					}
				}
			}
		}.bind(this));
		
	},
	
	buildAssets: function(){
		var ie = this.getIeVersion();
		this.wrap = new Element('div',{
			'class': 'lightbox-clone-wrap',
			styles: {
				'z-index': 10000
			}
		}).inject($(document.body));
		
		var next = new Image();
			next.className = 'lightbox-clone-next';
			next.src = this.assets.images.next;
		
		var previous = new Image();
			previous.className = 'lightbox-clone-previous';
			previous.src = this.assets.images.previous;
		
		var close = new Image();
			close.className = 'lightbox-clone-close';
			close.src = this.assets.images.close;
		
		this.assets.elements.next = $(next);
		this.assets.elements.previous = $(previous);
		this.assets.elements.close = $(close);
		this.assets.elements.text = new Element('div', { 'class': 'lightbox-clone-text' });
		
		$$(this.assets.elements.next,this.assets.elements.previous,this.assets.elements.close).setStyles({
			position: 'absolute',
			top: '50%',
			opacity: .6,
			cursor: 'pointer'
		});
		
		this.assets.elements.next.setStyles({
			margin: '-25px 0 0 0',
			right: 10
		});
		
		this.assets.elements.previous.setStyles({
			margin: '-25px 0 0 0',
			left: 10
		});
		
		this.assets.elements.close.setStyles({
			top: 10,
			right: 10,
			opacity: 0
		});
		
		var backgroundColor = '';
		
		if(ie > 8 || ie == -1){
			backgroundColor = 'rgba(0,0,0,0.6)';
		} else {
			backgroundColor = '#000';
		}
		
		this.assets.elements.text.setStyles({
			position: 'absolute',
			bottom: 10,
			left: 10,
			padding: '8px 10px',
			'font-family': 'arial',
			'font-size': 11,
			color: '#fff',
			'text-shadow': '0 1px 0 #000',
			'background': backgroundColor,
			'border-radius': '2px'
		});
		
		// Loading element
		this.assets.elements.loading = new Element('div',{
			styles: {
				position: 'absolute',
				top: -100,
				left: -100,
				height: 50,
				width: 50,
				background: 'center url('+ this.assets.images.loading +') no-repeat #000',
				opacity: 0,
				'border-radius': '2px',
				'z-index': 10000
			}
		}).inject( this.wrap );
		
		// Overlay element
		if(this.options.overlay){
			
			this.assets.elements.overlay = new Element('div', {
				'class': 'lightbox-clone-overlay',
				styles: {
					position: 'absolute',
					top: 0,
					left: 0,
					'z-index': 1,
					background: this.options.overlayColor,
					opacity: 0
				}
			}).inject(this.wrap);
			
			this.assets.elements.overlayFx = new Fx.Morph(this.assets.elements.overlay, { duration: this.options.speed, link: 'cancel', transition: Fx.Transitions.Quad.easeInOut });
			
		}
	},
	
	getCurrentImage: function(){
		for(var i = 0; i < this.images.length; i++){
			if(this.images[i].visible){
				return this.images[i];
			}
		}
	},
	
	getIeVersion: function(){
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		return rv;
	},
	
	startLoading: function(){
		var viewSize = window.getSize();
		var viewScroll = window.getScroll();
		
		this.assets.elements.loading.setStyles({
			top: (viewSize.y/2 - 25) + viewScroll.y,
			left: (viewSize.x/2 - 25)
		});
		
		this.assets.elements.loading.fade(.6);
	},
	
	stopLoading: function(){
		this.assets.elements.loading.fade(0);
	},
	
	loadImage: function(image, callback){
		var img = new Image();
		var loadingCords = this.getLinkCords(image);
		
		var loading = new Element('div',{
			'styles': {
				position: 'absolute',
				top: loadingCords.position.y,
				left: loadingCords.position.x,
				width: loadingCords.size.x,
				height: loadingCords.size.y,
				background: 'center url('+ this.assets.images.loading +') no-repeat #000',
				opacity: 0,
				'z-index': 7500
			}
		}).inject( this.wrap );
			
		var loadingFx = new Fx.Morph(loading,{ link: 'cancel' });
			loadingFx.start({ opacity: .6 });
		
		img.onload = function(){
			this.fireEvent('onLoad', [image]);
			
			if(!image.imageElement){
				image.imageElement = new Element('div');
				image.imageElement.setStyles({
					position: 'absolute',
					'z-index': 9000,
					opacity: 0,
					height: 0,
					width: 0
				});
				
				image.imageElement.inject( this.wrap );
				image.fx = new Fx.Morph(image.imageElement, { duration: this.options.speed, link: 'cancel', transition: Fx.Transitions.Quad.easeInOut });
				image.width = img.width;
				image.height = img.height;
				image.visible = false;
				
				$(img).setStyles({
					width: '100%',
					height: '100%'
				});
				
				$(img).inject( image.imageElement );
			}
			
			callback();
			
			loadingFx.start({ opacity: 0 }).chain(function(){
				loading.destroy();
			});
		}.bind(this);
		
		img.src = image.linkElement.get('href');
	},
	
	showOverlay: function(){
		this.assets.elements.overlay.setStyles({
			width: window.getSize().x,
			height: window.getScrollSize().y
		});
		
		this.assets.elements.overlayFx.start({
			opacity: this.options.overlayOpacity
		});
	},
	
	hideOverlay: function(){
		this.assets.elements.overlayFx.start({
			opacity: 0
		});
	},
	
	zoomIn: function(image){
		var imageCords = this.getPosition(image);
		var linkCords = this.getLinkCords(image);
		
		image.visible = true;
		image.imageElement.setStyle('z-index', 9000);
		
		image.fx.start({
			top: [linkCords.position.y,imageCords.position.y],
			left: [linkCords.position.x,imageCords.position.x],
			height: [linkCords.size.y,imageCords.size.y],
			width: [linkCords.size.x,imageCords.size.x],
			opacity: 1
		});
		
		if(this.options.overlay)
			this.showOverlay();
		
		this.fireEvent('onZoomIn', [image]);
	},
	
	zoomOut: function(image){
		var linkCords = this.getLinkCords(image);
		
		image.visible = false;
		
		image.fx.start({
			top: linkCords.position.y,
			left: linkCords.position.x,
			height: linkCords.size.y,
			width: linkCords.size.x,
			opacity: 0
		});
		
		image.imageElement.setStyles({
			'z-index': 8500
		});
		
		if(this.options.overlay)
			this.hideOverlay();
		
		this.fireEvent('onClose', [image]);
		this.fireEvent('onZoomOut', [image]);
	},
	
	slideIn: function(image,reverse){
		var cords = this.getPosition(image);
		var from;
		
		image.visible = true;
		
		image.imageElement.setStyles({
			top: cords.position.y,
			width: cords.size.x,
			height: cords.size.y,
			opacity: 0,
			'z-index': 9000
		});
		
		if(reverse){
			from = cords.position.x-50;
		}else{
			from = cords.position.x+50;
		}
		
		image.fx.start({
			left: [from,cords.position.x],
			opacity: 1
		});
		
	},
	
	slideOut: function(image){
		var cords = this.getPosition(image);
		image.visible = false;
		
		image.imageElement.setStyles({
			'z-index': 8500
		});
		
		image.fx.start({
			//left: cords.position.x-100,
			opacity: 0
		});
		
		this.fireEvent('onClose', [image]);
	},
	
	getPosition: function(image){
		var viewSize = window.getSize();
		var viewScroll = window.getScroll();
		var windowSize = {};
		
		windowSize.x = image.width;
		windowSize.y = image.height;
		
		if( viewSize.x <= windowSize.x ){
			windowSize.x = viewSize.x - this.options.margin;
			windowSize.y = image.height * (windowSize.x / image.width);
		}
		
		if( viewSize.y <= windowSize.y ){
			windowSize.y = viewSize.y - this.options.margin;
			windowSize.x = image.width * (windowSize.y / image.height);
		}
		
		return {
			size: {
				x: windowSize.x, 
				y: windowSize.y
			},
			position: {
				x: (viewSize.x/2)-(windowSize.x/2),
				y: (viewSize.y/2)-(windowSize.y/2) + viewScroll.y
			}
		};
		
	},
	
	getLinkCords: function(image){
		var children = image.linkElement.getChildren();
		var cords;
		
		if(image.linkElement.getStyle('display') == 'inline' && children.length > 0){
			cords = children[0].getCoordinates();
		} else {
			cords = image.linkElement.getCoordinates();
		}
		
		return {
			size: {
				x: cords.width,
				y: cords.height
			},
			position: {
				x: cords.left,
				y: cords.top
			}
		};
	},
	
	attachControls: function(image){
		if(this.gallerys[image.gallery]) {
			var index = this.gallerys[image.gallery].indexOf(image);
			var nextImage = (this.gallerys[image.gallery][index+1]) ? this.gallerys[image.gallery][index+1] : null;
			var previousImage = (this.gallerys[image.gallery][index-1]) ? this.gallerys[image.gallery][index-1] : null;
		}
		
		if(nextImage)
			this.assets.elements.next.inject(image.imageElement);
		
		if(previousImage)
			this.assets.elements.previous.inject(image.imageElement);
		
		this.assets.elements.next.removeEvents('click');
		this.assets.elements.previous.removeEvents('click');
		
		this.assets.elements.next.addEvent('click', function(){
			this.showImage(nextImage);
			document.removeEvent('keydown', keyboardShortcuts);
		}.bind(this));
		
		this.assets.elements.previous.addEvent('click', function(){
			this.showImage(previousImage,true);
			document.removeEvent('keydown', keyboardShortcuts);
		}.bind(this));
		
		image.imageElement.addEvents({
			'mouseenter': function(){
				this.assets.elements.next.fade(.6);
				this.assets.elements.previous.fade(.6);
				this.assets.elements.close.fade(.6);
				this.assets.elements.text.fade(1);
			}.bind(this),
			'mouseleave': function(){
				this.assets.elements.next.fade(0);
				this.assets.elements.previous.fade(0);
				this.assets.elements.close.fade(0);
				this.assets.elements.text.fade(0);
			}.bind(this)
		});
		
		var keyboardShortcuts = function(e){
			if(e.code == 39 && nextImage) {
				// right
				this.showImage(nextImage);
			} else if(e.code == 37 && previousImage) {
				// left
				this.showImage(previousImage,true);
			} else if(e.code == 27) {
				// esc
				this.zoomOut(image);
			} else {
				return;
			}
			e.stop();
			document.removeEvent('keydown', keyboardShortcuts);
		}.bind(this);
		
		document.addEvent('keydown', keyboardShortcuts);
		
		this.assets.elements.close.inject(image.imageElement);
		this.assets.elements.text.inject(image.imageElement);
		
		if( image.linkElement.get('title') != '' && image.linkElement.get('title') ) {
			this.assets.elements.text.setStyle('display','block');
			this.assets.elements.text.set('html', image.linkElement.get('title'));
			this.assets.elements.text.fade(1);
		}else{
			this.assets.elements.text.setStyle('display','none');
		}
		
		var img = image.imageElement.getElement('img');
		
		img.removeEvents('click');
		$$(this.assets.elements.close,this.assets.elements.overlay).addEvent('click', function(){
			this.zoomOut(image);
			document.removeEvent('keydown', keyboardShortcuts);
		}.bind(this));
	},
	
	showImage: function(image,reverse){
		var visibleImages = [];
		
		if(image.visible)
			return;
		
		for(var i = 0; i < this.images.length; i++){
			if(this.images[i].visible){
				visibleImages.push(this.images[i]);
			}
		}
		
		if(visibleImages.length > 0){
			this.startLoading();
		}
		
		this.loadImage(image, function(){
			this.attachControls(image);
			
			if(visibleImages.length == 0){
				this.zoomIn(image);
			} else {
				this.slideIn(image,reverse);
				this.stopLoading();
			}
			
			for(var i = 0; i < visibleImages.length; i++){
				this.slideOut(visibleImages[i]);
			}
		}.bind(this));
		
		this.fireEvent('onOpen', [image]);
	},
	
	addImage: function(element, galleryNameParam){
		var rel = element.get('rel');
		var gallery = (rel) ? rel.match(/\[[\w\S ]*?\]/g) : null;
		var galleryName = '';
		
		if(galleryNameParam) {
			galleryName = galleryNameParam;
		} else if(gallery) {
			galleryName = gallery[0];
		}
		
		var image = {
			visible: false,
			linkElement: element,
			imageElement: null,
			gallery: galleryName
		};
		
		this.images.push(image);
		
		if(galleryName != '') {
			if(!this.gallerys[galleryName]) {
				this.gallerys[galleryName] = [];
			}
			this.gallerys[galleryName].push(image);
		}
		
		image.linkElement.addEvent('click', function(e){
			e.stop();
			this.showImage(image);
		}.bind(this));
		
	}
});

window.addEvent('domready', function(){
	var lightboxclone = new LightBoxClone();
});