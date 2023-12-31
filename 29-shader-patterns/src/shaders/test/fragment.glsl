#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
  return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    // Rainbow
    // gl_FragColor = vec4(vUv, 0.5, 1.0);

    // Pattern 3
    // float strength = vUv.x;

    // Patern 4 (shadow from bottom to top)
    // float strength = vUv.y;

    // Patern 5 (shadow from top to bottom)
    // float strength = 1.0 - vUv.y;

    // Pattern 6 (less of a shadow)
    // float strength = vUv.y * 10.0;

    // Pattern 7 (window blinds)
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern 8 (same as 7, but more harsh)
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // Pattern 9 (more spaces, like more open blinds)
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern 10 (vertical blinds)
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern 11 (grid)
    // (values go above 1)
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // Clamp the strength (don't go above 1)
    strength = clamp(strength, 0.0, 0.9);

    // Pattern 12 (dots)
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 13 (more longer dots)
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 14 (right angles as dots)
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;


    // Pattern 15 (plus signs)
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;


    // Pattern 16 (shadow in middle)
    // float strength = abs(vUv.x - 0.5);

    // Pattern 17 (shadow in cross)
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // Pattern 18 (shadow as diagonal square)
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
 
    // Pattern 19 (square in middle)
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))); 

    // Pattern 20 (big square in middle)
    // Opposite, white
    // float blackSquare = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float whiteSquare = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = blackSquare * whiteSquare;

    // Pattern 21 (gradient with some rectangles?)
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // Pattern 22 (gradient grid)
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // Pattern 23 (TV noise)
    // float strength = random(vUv);

    // Pattern 24 (TV noise, minecraft version (maybe grey dirt lol))
    // vec2 gridUv = vec2(
    //   floor(vUv.x * 10.0) / 10.0,
    //   floor(vUv.y * 10.0) / 10.0
    // );
    // float strength = random(gridUv);

    // Pattern 25 (diagonal of 24)
    // vec2 gridUv = vec2(
    //   floor(vUv.x * 10.0) / 10.0,
    //   floor((vUv.y + 10.0 + vUv.x + 0.5)* 10.0) / 10.0
    // );
    // float strength = random(gridUv);

    // Pattern 26
    // float strength = length(vUv);

    // Pattern 27 (circle in center)
    // Can also change the center of the circle
    // float strength = distance(vUv, vec2(0.5));

    // Pattern 28 (white circle in center)
    // float strength = 1.0 - distance(vUv, vec2(0.5)); 
    
    // Pattern 29 (circular light, like in films moving)
    // float strength = 0.015 / distance(vUv, vec2(0.5)); 

    // Pattern 30 (stretch out 29, like a galaxy!)
    // vec2 lightUv = vec2(
    //   vUv.x * 0.1 + 0.45,
    //   vUv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 / distance(lightUv, vec2(0.5)); 

    // Pattern 31 (christmas diamond star)
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5))); 

    // Pattern 32 (rotate 31)
    float pi = 3.1415926535897932384626433832795;
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5)); 

    // float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5))); 

    // Pattern 33 (Circle, Japan)
    // float strength = step(0.25, distance(vUv, vec2(0.5)));
    
    // Pattern 34 (faded donut)
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    // Pattern 35 (thin circle outline)
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // Pattern 36 (inverse of 35)
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)); 

    // Pattern 37 (random aggressive glob of 36)
    // vec2 wavedUv = vec2(vUv.x,vUv.y + sin(vUv.x * 30.0) * 0.1); 
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Pattern 38 (more globby)
    // vec2 wavedUv = vec2(
    //   vUv.x + sin(vUv.y * 30.0) * 0.1,
    //   vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Pattern 39 (globby but looks more circle religious)
    // vec2 wavedUv = vec2(
    //   vUv.x + sin(vUv.y * 100.0) * 0.1,
    //   vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // Pattern 40 (math!)
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // Pattern 41 (offset)
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;

    // Pattern 42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = angle;

    // Pattern 43 (blinds in a circle)
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = mod(angle * 20.0, 1.0);

    // Pattern 44 (more spaced out)
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = sin(angle * 100.0);

    // Pattern 45 (spikey circle)
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float radius = 0.25 + sin(angle * 100.0) * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // Pattern 46 (perlin noise)
    // float strength = cnoise(vUv * 10.0); 
    
    // Pattern 47 (cow!)
    // float strength = step(0.0, cnoise(vUv * 10.0));

    // Pattern 48 (more blurred) (reflection under water, plasma energy things)
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));

    // Pattern 49 (im high)
    // float strength = sin(cnoise(vUv * 10.0) * 20.0);

    // Pattern 50 (more spaced out)
    // float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    // Colored version
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0); 

    // For patterns that go above 1, clamp the strength
    // strength = clamp(strength, 0.0, 1.0); 

    // Grey
    // Shadow goes from bottom to top
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
}
