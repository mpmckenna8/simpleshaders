precision highp float;
uniform float time;

uniform vec2 resolution;

#define CIRCLE_COLOR    vec4(1.0, 0.4313, 0.3411, 1.0)
#define OUTSIDE_COLOR   vec4(0.3804, 0.7647, 1.0, 1.0)

void main() {


  float d2 = distance(gl_FragCoord.xy, vec2(resolution.x/2.0, resolution.y / 2.0));


  if(d2 >= 128.0) {
    gl_FragData[0] = vec4(OUTSIDE_COLOR.rg, OUTSIDE_COLOR.b * sin(time) , 1.0);
  } else {
    gl_FragData[0] = CIRCLE_COLOR;
  }
}

