var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
	
			var cubeTexture = THREE.ImageUtils.loadTexture('photo.jpg');
	
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshLambertMaterial({ map: cubeTexture });
			var cube = new THREE.Mesh( geometry, material );
			cube.overdraw = true;
			scene.add( cube );

			camera.position.z = 5;
			
			var directionalLight = new THREE.DirectionalLight(0xffffff);
			directionalLight.position.set(1, 1, 1).normalize();
			scene.add(directionalLight);

			var render = function () {
				requestAnimationFrame( render );

				cube.rotation.x += 0.05;
				cube.rotation.y += 0.05;

				renderer.render(scene, camera);
			};
	

	render();