# Contributing

This is a 'temp' file for now. If you want to contribute, I don't know how it 
works to be honest with you! I guess it's just a pull request which I later 
can review?

Either way, feel free to contribute in any way or form. This guideline should be 
updated, slowly, but in time it should be good.

## Code of Conduct

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of
experience, nationality, personal appearance, race, religion, or sexual identity
and orientation.

### Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Before Contributing

Contribution suggestions are tracked as GitHub Issues. After you've determined which 
repository your contribution is related to, create a new Github Issue on that 
repository and provide the following information:

	* __A nice and clear title__, which will grab my attention
	* __What change could be made__, with reference to what it is. Add/remove/edit, 
	followed by file/files it's in and snippet
	* __Why should it be made__, with an explanation of why it is needed/good
	* __Current branch and commit ID__, so I know from where the contribution 
	originated
	* __References__, to support your contribution, explanation, etc


## Pull Request

	* Use the [template]()
	* Clean title, no references
	* Follow the styleguide below
	* Document changes thoroughly

## Styleguide

In terms of editor standards, refer to [.editorconfig](https://github.com/Weemee/woa/blob/master/.editorconfig)
Other than that, refer to the .eslintrc
[Client](https://github.com/Weemee/woa/blob/master/client/.eslintrc)
[Server](https://github.com/Weemee/woa/blob/master/server/.eslintrc)

```js
	// Use this:
	export default class ClassName {

	}

	// Instead of:
	class ClassName {

	}
	export default ClassName
```

Just keep it clean and organized, refer to any other file for styling.
