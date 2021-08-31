class Matrix {
	constructor() {

		this.Rotation = new MatrixRotation();
		this.View = [0, 0, 0, 0];
		this.Identity = [];
		this.Scalar = [0.0, 0.0, 1, 1];
		this.orientation = [0.0, 0.0, 0.0, 0.0];
		this.center = [0.0, 0.0, 0.01, 1];
		this.vUp = [0.0, 1, 0.0, 0.1];
		this.perspectiveView = [[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]];
		this.modelViewMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
		this.modelMatrix = [[4, 0, 0, 0],[0, 4, 0, 0],[0, 0, 4, 0],[0, 0, 0, 4]];

	}

	normalize(v) {
		var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		if (length > 0.00001) {
			return [v[0] / length, v[1] / length, v[2] / length, 0];
		} else {
			return [0, 0, 0, 0];
		}
	}
	toArr(m) { return [].concat.apply([], m); }
	Cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0], 0]; };
	lookAt(eye, target, cosHujWieCo) {
		var tmp = [eye[0] - target[0], eye[1] - target[1], eye[2] - target[2], eye[3] - target[3]];
		var vz = this.normalize(tmp);
		var vx = this.normalize(this.Cross([0, 1, 0], vz));

		//   vy doesn't need to be normalized because it's a cross
		//   product of 2 normalized vectors
		var vy = this.Cross(vz, vx);
		// console.log(this.invertMatrix(this.toArr([vx,vy,vz,[0,0,0,1]])));
		return this.invertMatrix(this.toArr([vx, vy, vz, cosHujWieCo]));
		//                                                                                       new Vector4(vy, 0),
		//                                        new Vector4(, 0),
		//                                                                                       new Vector4(eye, 1));
		//  return inverseViewMatrix.getInverse();
	}
	r() {
		var n = {};
		n.EPSILON = 1e-6, n.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, n.RANDOM = Math.random, n.ENABLE_SIMD = !1, n.SIMD_AVAILABLE = n.ARRAY_TYPE === this.Float32Array && "SIMD" in this, n.USE_SIMD = n.ENABLE_SIMD && n.SIMD_AVAILABLE, n.setMatrixArrayType = function (t) {
			n.ARRAY_TYPE = t
		};
		return n;
	}
	perspective(fieldOfViewInRadians, aspect, near, far) {
		var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
		var rangeInv = 1.0 / (near - far);

		return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0];
	}
	m4Mult(m1, m2) {
		var tmp = [];
		var z = 0;
		for (var i = 0; i < m1.length; i++) {
			z = 0;
			tmp[i] = m1[i] * m2[i];
			//tmp[i]= [[(m1[i][0]*m2[i][0])],[(m1[i][1]*m2[i][1])],[(m1[i][3]*m2[i][3])],[(m1[i][4]*m2[i][4])] ];
			// tmp[i][z]= [(m1[z][0]*m2[z][0])+(m1[z][1]*m2[z][1])+(m1[z][3]*m2[z][3])+(m1[z][4]*m2[z][4]) ];z++;
			// tmp[i][z]= [(m1[z][0]*m2[z][0])+(m1[z][1]*m2[z][1])+(m1[z][3]*m2[z][3])+(m1[z][4]*m2[z][4]) ];z++;
			// tmp[i][z]= [(m1[z][0]*m2[z][0])+(m1[z][1]*m2[z][1])+(m1[z][3]*m2[z][3])+(m1[z][4]*m2[z][4]) ];
		}
		return tmp;
	}
	multiply(t, a, n) {
		var r = a[0],
			o = a[1],
			u = a[2],
			l = a[3],
			e = n[0],
			M = n[1],
			s = n[2],
			i = n[3];
		return t[0] = r * e + u * M, t[1] = o * e + l * M, t[2] = r * s + u * i, t[3] = o * s + l * i, t;
	}
	getmult() {
		return this.multiply(this.View, this.perspectiveView, [0, 0, 0, 1]);
	}
	subtractVectors(a, b) {
		return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	}
	invertMatrix(matrix) {

		// Adapted from: https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js

		// Performance note: Try not to allocate memory during a loop. This is done here
		// for the ease of understanding the code samples.
		var result = [];

		var n11 = matrix[0], n12 = matrix[4], n13 = matrix[8], n14 = matrix[12];
		var n21 = matrix[1], n22 = matrix[5], n23 = matrix[9], n24 = matrix[13];
		var n31 = matrix[2], n32 = matrix[6], n33 = matrix[10], n34 = matrix[14];
		var n41 = matrix[3], n42 = matrix[7], n43 = matrix[11], n44 = matrix[15];

		result[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		result[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		result[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		result[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		result[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		result[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		result[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		result[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		result[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		result[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		result[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		result[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		result[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		result[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		result[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		result[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

		var determinant = n11 * result[0] + n21 * result[4] + n31 * result[8] + n41 * result[12];

		if (determinant === 0) {
			throw new Error("Can't invert matrix, determinant is 0");
		}

		for (var i = 0; i < result.length; i++) {
			result[i] /= determinant;
		}

		return result;
	}

	perspectiveProjection(fieldOfView, aspectRatio, near, far) {
		var projectionMatrix = [];

		var right = near * Math.tan((fieldOfView / 180) * 0.5);
		var top = right / aspectRatio;

		// first column
		projectionMatrix[0] = [];
		projectionMatrix[1] = [];
		projectionMatrix[2] = [];
		projectionMatrix[3] = [];
		projectionMatrix[0][0] = near / right;
		projectionMatrix[0][1] = 0.0;
		projectionMatrix[0][2] = 0.0;
		projectionMatrix[0][3] = 0.0;

		// second column
		projectionMatrix[1][0] = 0.0;
		projectionMatrix[1][1] = near / top;
		projectionMatrix[1][2] = 0.0;
		projectionMatrix[1][3] = 0.0;

		// third column
		projectionMatrix[2][0] = 0;
		projectionMatrix[2][1] = 0;
		projectionMatrix[2][2] = -(far + near) / (far - near);
		projectionMatrix[2][3] = -1;

		// fourth column
		projectionMatrix[3][0] = 0.0;
		projectionMatrix[3][1] = 0.0;
		projectionMatrix[3][2] = (2 * far * near) / (far - near);
		projectionMatrix[3][3] = 0.0;

		return projectionMatrix;
	}
	rotateTransform(m, vec3 = { x: 0, y: 0, z: 0 }, Arr = false) {
		var tmp = [];
		this.Rotation.X(vec3.x).Y(vec3.y).Z(vec3.z);
		for (var ii = 0; ii < m.length; ii++) {
			tmp[ii] = this.Rotation.xyzTransform(m[ii]);
		}
		if (Arr === false) {
			return tmp;
		} else {
			return this.toArr(tmp);
		}
	}
	LookAtRH(eye, target, up) {
		// var zaxis = this.normalize( [eye[0] - target[0], eye[1] - target[1], eye[2] - target[2], eye[3] - target[3]]);    // The "forward" vector.
		// var xaxis = this.normalize(this.Cross([up[0]-zaxis[0],up[1]-zaxis[1],up[2]-zaxis[2],up[3]-zaxis[3]]));// The "right" vector.
		// var yaxis = this.Cross([zaxis[0]-xaxis[0],zaxis[1]-xaxis[1],zaxis[2]-xaxis[2],zaxis[3]-xaxis[3]]);     // The "up" vector.
		var zaxis = this.normalize(eye,target);    // The "forward" vector.
		var xaxis = this.normalize(this.Cross(up,zaxis));// The "right" vector.
		var yaxis = this.Cross(zaxis,xaxis);     // The "up" vector.

		// Create a 4x4 view matrix from the right, up, forward and eye position vectors
		return [
			[xaxis[0], yaxis[0], zaxis[0], 0],
			[xaxis[1], yaxis[1], zaxis[1], 0],
			[xaxis[2], yaxis[2], zaxis[2], 0],
			[-(xaxis[0]*eye[0]+xaxis[1]*eye[1]+xaxis[2]*eye[2]+xaxis[3]*eye[3]), -(yaxis[0]*eye[0]+yaxis[1]*eye[1]+yaxis[2]*eye[2]+yaxis[3]*eye[3]), -(zaxis[0]*eye[0]+zaxis[1]*eye[1]+zaxis[2]*eye[2]+zaxis[3]*eye[3]), 1]
		];
	}
}

class MatrixRotation {
	constructor() {
		this.mat = {};
		this.cos = { x: 1, y: 1, z: 1 };
		this.sin = { x: 0, y: 0, z: 0 };
		this.x = [[1, 0, 0, 0], [0, this.cos.x, -this.sin.x, 0], [0, this.sin.x, this.cos.x, 0], [0, 0, 0, 0]];
		this.y = [[this.cos.y, 0, this.sin.y, 0], [0, 1, 0, 0], [-this.sin.y, 0, this.cos.y, 0], [0, 0, 0, 0]];
		this.z = [[this.cos.z, -this.sin.z, 0, 0], [this.sin.z, this.cos.z, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
		this.transform = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
	}
	Cos(deg) { return Math.cos(Math.PI * (deg / 180)); }
	Sin(deg) { return Math.sin(Math.PI * (deg / 180)); }
	X(deg) {
		this.sin.x = this.Sin(deg);
		this.cos.x = this.Cos(deg);
		this.x = [[1, 0, 0, 0], [0, this.cos.x, -this.sin.x, 0], [0, this.sin.x, this.cos.x, 0], [0, 0, 0, 1]];
		return this;
	}
	Y(deg) {
		this.sin.y = this.Sin(deg);
		this.cos.y = this.Cos(deg);
		this.y = [[this.cos.y, 0, this.sin.y, 0], [0, 1, 0, 0], [-this.sin.y, 0, this.cos.y, 0], [0, 0, 0, 1]];
		return this;
	}
	Z(deg) {
		this.sin.z = this.Sin(deg);
		this.cos.z = this.Cos(deg);
		this.z = [[this.cos.z, -this.sin.z, 0, 0], [this.sin.z, this.cos.z, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
		return this;
	}

	setXYZ(Input = []) {
		this.X(Input[0]).Y(Input[1]).Z(Input[2]);
		return this;
	}
	xTransform(Input = []) { return [((this.x[0][0] * Input[0] + this.x[0][1] * Input[1] + this.x[0][2] * Input[2] + this.x[0][3] * Input[3])), ((this.x[1][0] * Input[0] + this.x[1][1] * Input[1] + this.x[1][2] * Input[2] + this.x[1][3] * Input[3])), ((this.x[2][0] * Input[0] + this.x[2][1] * Input[1] + this.x[2][2] * Input[2] + this.x[2][3] * Input[3])), ((this.x[3][0] * Input[0] + this.x[3][1] * Input[1] + this.x[3][2] * Input[2] + this.x[3][3] * Input[3]))]; }
	yTransform(Input = []) { return [((this.y[0][0] * Input[0] + this.y[0][1] * Input[1] + this.y[0][2] * Input[2] + this.y[0][3] * Input[3])), ((this.y[1][0] * Input[0] + this.y[1][1] * Input[1] + this.y[1][2] * Input[2] + this.y[1][3] * Input[3])), ((this.y[2][0] * Input[0] + this.y[2][1] * Input[1] + this.y[2][2] * Input[2] + this.y[2][3] * Input[3])), ((this.y[3][0] * Input[0] + this.y[3][1] * Input[1] + this.y[3][2] * Input[2] + this.y[3][3] * Input[3]))]; }
	zTransform(Input = []) { return [((this.z[0][0] * Input[0] + this.z[0][1] * Input[1] + this.z[0][2] * Input[2] + this.z[0][3] * Input[3])), ((this.z[1][0] * Input[0] + this.z[1][1] * Input[1] + this.z[1][2] * Input[2] + this.z[1][3] * Input[3])), ((this.z[2][0] * Input[0] + this.z[2][1] * Input[1] + this.z[2][2] * Input[2] + this.z[2][3] * Input[3])), ((this.z[3][0] * Input[0] + this.z[3][1] * Input[1] + this.z[3][2] * Input[2] + this.z[3][3] * Input[3]))]; }
	xyzTransform(Input = []) { return this.zTransform(this.yTransform(this.xTransform(Input))); }


}

Matrix.prototype.getV4xV4 = function (a, b) {
	return [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]];
}
Matrix.prototype.translationV4xM4 = function (V4, M4) {
	return [
		M4[0][0] * V4[0] + M4[0][1] * V4[1] + M4[0][2] * V4[2] + M4[0][3] * V4[3],
		M4[1][0] * V4[0] + M4[1][1] * V4[1] + M4[1][2] * V4[2] + M4[1][3] * V4[3],
		M4[2][0] * V4[0] + M4[2][1] * V4[1] + M4[2][2] * V4[2] + M4[2][3] * V4[3],
		M4[3][0] * V4[0] + M4[3][1] * V4[1] + M4[3][2] * V4[2] + M4[3][3] * V4[3]];
};

//   projectionMatrix[0]
// 	projectionMatrix[0]
// 	projectionMatrix[0]
// 	projectionMatrix[0]
// 	projectionMatrix[0]

// 	projectionMatrix[1]
// 	projectionMatrix[1]
// 	projectionMatrix[1]
// 	projectionMatrix[1]

// 	projectionMatrix[2]
// 	projectionMatrix[2]
// 	projectionMatrix[2]
// 	projectionMatrix[2]

// 	projectionMatrix[3]
// 	projectionMatrix[3]
// 	projectionMatrix[3]
// 	projectionMatrix[3]




// 	mat4 LookAtRH( vec3 eye, vec3 target, vec3 up )
// {
//     vec3 zaxis = normal(eye - target);    // The "forward" vector.
//     vec3 xaxis = normal(cross(up, zaxis));// The "right" vector.
//     vec3 yaxis = cross(zaxis, xaxis);     // The "up" vector.

//     // Create a 4x4 view matrix from the right, up, forward and eye position vectors
//     mat4 viewMatrix = {
//         vec4(      xaxis.x,            yaxis.x,            zaxis.x,       0 ),
//         vec4(      xaxis.y,            yaxis.y,            zaxis.y,       0 ),
//         vec4(      xaxis.z,            yaxis.z,            zaxis.z,       0 ),
//         vec4(-dot( xaxis, eye ), -dot( yaxis, eye ), -dot( zaxis, eye ),  1 )
//     };

//     return viewMatrix;
// }
