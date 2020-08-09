// (function() {
	var triggerBtn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		//burger class在triggerBtn上
		burger = document.querySelector('.burger'),
		closeBtn = overlay.querySelector( '.overlay-close' ); //改為把buger與close作為同一個按鈕
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		//menu overlay ------------------
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
		//menu buregr ------------------------
		if( classie.has( burger, 'open' ) ) {
			classie.remove( burger, 'open' );
			classie.add( burger, 'close' );
			var onEndTransitionFn = function( ev ) {
				classie.remove( burger, 'close' );
			};
			if( support.transitions ) {
				burger.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( burger, 'close' ) ) {
			classie.add( burger, 'open' );
		}
	}

	triggerBtn.addEventListener( 'click', toggleOverlay );
	// closeBtn.addEventListener( 'click', toggleOverlay );
// })();