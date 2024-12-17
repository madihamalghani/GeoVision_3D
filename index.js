import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import * as THREE from "three";
const w=window.innerWidth;
const h=window.innerHeight;
// The antialias: true makes the edges of shapes look smoother.
const renderer= new THREE.WebGLRenderer({antialias:true})
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);// Add renderer to the webpage
const fov=75;// Field of view (how wide the camera sees)
const aspect=w/h;
const near=0.1;
const far=10;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z=2;// Move the camera back so we can see the object
const scene=new THREE.Scene()//A scene is like an empty room where you can put objects, lights, and cameras.
const controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true;
controls.dampingFactor=0.03;

const geo= new THREE.IcosahedronGeometry(1.0,2)
const mat= new THREE.MeshStandardMaterial({
    color:0xffffff,
    flatShading:true})
const mesh=new THREE.Mesh(geo,mat)
scene.add(mesh)
const wireMat=new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true // Only edges of the shape are visible
})
const wireMesh=new THREE.Mesh(geo,wireMat)
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh)
const hemilight=new THREE.HemisphereLight(0x0099ff,0x640D5F)//0x0099ff,0x00aa55
scene.add(hemilight)
function animate(t=0){
    requestAnimationFrame(animate)
    mesh.rotation.y=t * 0.0001;
    renderer.render(scene,camera)
    controls.update();
}
animate();
