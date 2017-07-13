var THREE = require('three');

var glslify = require('glslify');

// load up the shaders
var frag = glslify.file('./frag.glsl');
let vert = glslify.file('./vert.glsl');

console.log('loaded three and the shaders!')
//prints the fragment file
//console.log('frag is, ', frag)

// set up the context
var container  = document.getElementById('container')
///var canvas     = container.appendChild(document.createElement('canvas'))


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
container.appendChild( renderer.domElement );



var scene = new THREE.Scene();


//var camera = new THREE.OrthographicCamera(  window.innerWidth/ -2 , window.innerHeight, 1, 3000  ); // new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 1;

  camera.position.z = 10;


let uniforms = {
					time:       { value: 1.0 },
					resolution: { value: new THREE.Vector2() },
				};


uniforms.resolution.value.x = renderer.domElement.width;
uniforms.resolution.value.y = renderer.domElement.height;


var material = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vert,
					fragmentShader: frag
				} );

        console.log('material is, ', material)


var geometry = new THREE.PlaneGeometry( 2, 2 );

//triangle(scene)
//new THREE.PlaneBufferGeometry( 2, 2 );

var plane = new THREE.Mesh( geometry, material );

//plane.position.set(0,0,0);


scene.add(plane);


var geometry = new THREE.BoxGeometry( 1, 1, 2 );
var material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xff00ff} );

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );



function animate() {
	requestAnimationFrame( animate );
  render();
}


function render() {
		uniforms.time.value += 0.05;
		renderer.render( scene, camera );
}



animate();


window.addEventListener( 'resize', onWindowResize, false );



function onWindowResize( event ) {

// when the window resizes try to reset all the reight stuff
// there might be an unnessarary amount of stuff here
  renderer.setSize( window.innerWidth, window.innerHeight );

  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();


}

