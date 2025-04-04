# 정적 블로그 만들기, CLI 만들기

사실 이번 챕터는 강의를 들으며 점점 멍때리게 되는 부분이 있었다. 분명 귀로는 듣고 있는데 들을수록 제2외국어를 듣고 있는 듯한 기분이랄까... 계속 놓치게 되는 부분도 많았고 반복해서 들어도 같은 상태였다. 이번 챕터에서 나는 도대체 뭘 배운걸까에 대한 고민을 한참 하다가 두 개 챕터에서 유독 많이 반복해서 듣기도 했고 신기했던 commander.js가 뭔지 좀 더 살펴보고자 했다. 강의만 듣고는 이해가 되지 않아 공식문서의 예제를 띄워놓고 하나하나 이해하려고 하면서 다시 강의를 들어보니 이제야 좀 이해가 가기 시작했다. 이후에 살펴본 commander.js는 생각보다 직관적이라, 다음에 한번 활용해서 뭔가를 만들어봐도 재밌을 것 같다는 생각을 했다. 또 이렇게 직접 cli를 구현하는 방법을 살펴보다보니, 그동안 터미널을 사용할 때 나왔던 용어들을 좀 더 잘 이해할 수 있겠다는 생각도 들었던 챕터였다.

## commander.js

```javascript
// commander.js GitHub 예제: https://github.com/tj/commander.js#readme
const { Command } = require("commander");
const program = new Command();

program.name("string-util").description("CLI to some JavaScript string utilities").version("0.8.0");

program
	.command("split") // 명령어 (package.json의 script에 key로 사용되는 부분이랑 매칭하면 이해하기 쉬움)
	.description("Split a string into substrings and display as an array") // help를 입력했을 때 어떤 명령어인지에 대한 설명을 확인할 수 있다
	.argument("<string>", "string to split") // 명령어 뒤에 인자로 넘길 수 있음. action에서 첫번째 인자로 받아서 활용 가능
	.option("--first", "display just the first substring")
	.option("-s, --separator <char>", "separator character", ",") // -s, --separator 둘 다 사용 가능
	.action((str, options) => {
		// options에는 option으로 추가했던 것들이 들어온다. cli에서 옵션을 입력했다면 true로 들어온다. e.g. { first: true })
		const limit = options.first ? 1 : undefined;
		console.log(str.split(options.separator, limit));
	});

program.parse();
```

```bash
# 아래는 위에서 만든 cli를 어떻게 사용할 수 있는지에 대해 작성한 부분이다.
$ node string-util.js help split
Usage: string-util split [options] <string> # 사용 문법 (위 cli를 같이 비교하면 각각의 메서드가 어떤 것을 의미하는 지 알기 쉽다.)

Split a string into substrings and display as an array.

Arguments:
  string                  string to split

Options:
  --first                 display just the first substring
  -s, --separator <char>  separator character (default: ",")
  -h, --help              display help for command

$ node string-util.js split --separator=/ a/b/c # 옵션은 이런 식으로 사용할 수 있다.
[ 'a', 'b', 'c' ]
```
