'use strict'

module.exports = {

	nodes: [],

	modules: [{
			from: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/', // jQuery from CDN
			inject: ['jquery.min.js'], // this file will be used on the page separately
		},
		{
			from: 'node_modules/slick-carousel/slick', // get slick from node_modules
			inject: ['slick.min.js'], // this file will be used on the page separately
			import: ['slick.css'], // this file will be imported into the common bundle
			filter: (file, node, page, type) => {
				console.log("TCL: type", type)
				console.log("TCL: page", page)
				console.log("TCL: node", node)
				console.log("TCL: file", file)

			}
		},
	],

}
