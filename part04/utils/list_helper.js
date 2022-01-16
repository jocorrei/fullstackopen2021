const dummy = (blogs) => {
	return 1;
  }

const totalLikes = (blogs) => {
	
	const result = (blogs.length 
		? blogs.reduce((pV, cV) => pV + cV.likes, 0)
		: 0) 
	return(result)
}

const favoriteBlog = (blogs) => {
		const {
		_id, __v, url, ...obj
	} = blogs.sort((a, b) => b.likes - a.likes)[0]
	console.log(obj);
	return obj
}

const mostBlogs = (blogs, key) => {
	let arr2 = []
	blogs.forEach(element => {
		if (arr2.some((val) => {return val[key] === element[key]})) {
			arr2.forEach((k) => {
				if (k[key] === element[key]) {
					k["blogs"]++
				}
			})
		} else {
			let a = {}
			a[key] = element[key]
			a["blogs"] = 1
			arr2.push(a);
		}
	})
	//	console.log(arr2.sort((a, b) => b.blogs - a.blogs)[0])
	
	return arr2.sort((a, b) => b.blogs - a.blogs)[0];
}

const mostLikes = (blogs, key) => {
	let arr2 = []
	blogs.forEach(element => {
		if (arr2.some((val) => {return val[key] === element[key]})) {
			arr2.forEach((k) => {
				if (k[key] === element[key]) {
					k["likes"] += element["likes"]
				}
			})
		} else {
			let a = {}
			a[key] = element[key]
			a["likes"] = element["likes"]
			arr2.push(a);
		}
	})
	//console.log(arr2.sort((a, b) => b.blogs - a.blogs)[0])
	console.log(arr2);
	
	return arr2.sort((a, b) => b.blogs - a.blogs)[0];
	
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
  }