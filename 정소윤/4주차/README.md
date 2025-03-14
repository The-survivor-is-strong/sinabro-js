# 블로그 링크

https://soyoondaily.tistory.com/entry/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Date-IntlDateTimeFormat%EB%A1%9C-%EB%82%A0%EC%A7%9C-%EB%8B%A4%EB%A3%A8%EA%B8%B0

# 블로그 내용

## Date() vs new Date()

**Date()처럼 함수로 호출할 경우 new Date().toString()과 동일하게 동작**하며, 현재 날짜/시간을 나타내는 **문자열을 반환**한다.

Date()는 문자열이기 때문에 Date 객체에서 사용하는 getDate(), getTime() 등의 인스턴스 메서드를 사용할 수 없다. 때문에 아래 첫번째 이미지처럼 Date() 뒤에 메서드를 사용하려고 할 경우 TypeError가 발생한다.

**new Date()**로 호출할 경우에는 **새로운 Date 객체를 반환**하며 관련된 메서드들을 사용할 수 있다.

[##_ImageGrid|kage@npWWg/btsMDtOPlYc/4BR0G4e5dRc1fJPrXUdXO1/img.png,kage@OAnMl/btsMDSm5Jzv/Ix4qbdQvbQ2DxQRvZEhZ60/img.png|data-is-animation="false" data-origin-height="106" data-origin-width="438" style="width: 50.146%; margin-right: 10px;" data-widthpercent="50.74",data-origin-width="329" data-origin-height="82" data-is-animation="false" style="width: 48.6912%;" data-widthpercent="49.26"|Date() vs new Date() 비교_##]

## 타임존 설정하기

toLocaleString을 사용하면 timezone을 설정할 수 있다. 첫 번째 파라미터에는 언어를 설정하고, 두번째 파라미터 안에 timeZone을 넣으면 시간대를 설정할 수 있다.

[##_Image|kage@emYtdo/btsMDxctpXL/6qgjtrZ0GPDwKGMfeDBM31/img.png|CDM|1.3|{"originWidth":346,"originHeight":87,"style":"alignCenter"}_##]

## UTC 시간 반환하기

new Date()를 사용할 경우, 로컬 시간을 기준으로 동작한다. 때문에 한국에서 실행하는 시간과 영국에서 실행하는 시간이 다르기 때문에 글로벌 서비스의 경우 서비스가 의도한대로 동작하지 않을 수 있다.

**new Date().toISOString()**을 사용하면 ISO 형식의 **UTC 시간대를 기준으로 문자열을 반환**한다.

"UTC 시간대를 기준으로 문자열을 반환한다면 이걸 new Date() 객체에 다시 넣었을 때는 어떤 걸 반환할까?" 시간대가 UTC로 설정되어 있기 때문에, 시간대가 로컬 시간을 기준(한국에 있다고 가정)으로 +9시간 더해져 출력된다. 문자열로 표시했을 때는 9시간의 차이가 있지만, **UTC 기준으로 봤을 때 동일한 시점**을 나타낸다. 때문에 new Date().getTime()과 toISOString()의 결과값을 new Date()로 넣어 getTime()을 적용한 값은 동일한 결과를 반환한다.

[##_ImageGrid|kage@BtSoO/btsMEynUsUg/lhtDIMeeIIFqvc1cmTRCZ1/img.png,kage@H5ZY2/btsMCavWRwL/85xVKZ7EkVtmrPjvsurNfk/img.png|data-origin-width="220" data-origin-height="82" data-is-animation="false" style="width: 27.9151%; margin-right: 10px;" data-widthpercent="28.24",data-origin-width="334" data-origin-height="49" data-is-animation="false" data-widthpercent="71.76" style="width: 70.9221%;"|toISOString 결과값과, 이를 다시 new Date에 넣었을 때의 반환값_##][##_ImageGrid|kage@AXULH/btsMDvMFbR5/7sjxMQf40c2vVO5CzZiKN1/img.png,kage@bcd5wy/btsMDJDVEjU/nL0IrSzDoNaIkRdTGFPf2K/img.png|data-origin-width="189" data-origin-height="48" data-is-animation="false" style="width: 37.5789%; margin-right: 10px;" data-widthpercent="38.02",data-origin-width="276" data-origin-height="43" data-is-animation="false" data-widthpercent="61.98" style="width: 61.2583%;"|new Date()와 toISOString()을 다시 new Date()에 넣었을 때, getTime() 메서드 반환 값은 동일_##]

#### **현재 시간 조회하고 싶을 때**

그럼 실무에서 UTC 시간대를 기준으로 날짜/시간을 알고 싶다고 했을 때 new Date().toISOString()을 한 다음 split이나 slice 등을 활용해서 포맷을 직접 해야하는걸까...?라는 생각이 들 것 같다. 자바스크립트 강의에서도 split을 사용하는 방법이 나왔는데, 사실 이렇게 되면 형식이 바뀐다고 했을 때, 혹은 포맷팅 하는 메서드가 잘못될 가능성 등이 있기 때문에 조심스럽게 써야 한다.

다행히도 이를 제공해주는 메서드가 있다. 기존에는 new Date()에 getDate(), getHours() 메서드를 활용하여 현재 날짜/시간을 가져왔는데, 여기에 UTC만 넣어주면 UTC 시간대를 기준으로 날짜/시간을 구할 수 있다. getUTCDate()를 사용하면 날짜, getUTCHours()를 사용하면 시간이 반환되며, 이 외에 getUTCXXX로 원하는 걸 다 구할 수 있다. (아래 이미지 참고)

[##_Image|kage@xJDgf/btsMEoMB7GR/GZ07ZTTtWtYKjCSmKSbKik/img.png|CDM|1.3|{"originWidth":193,"originHeight":146,"style":"alignCenter","width":330,"height":250,"caption":"개발자 도구에 .getUTC를 입력했을 때 나오는 다양한 메서드"}_##]

## Intl.DateTimeFormat

new Intl.DateTimeFormat을 사용하고, 포맷하고자 하는 시간을 .format() 괄호 안에 넣으면 string을 반환한다. 만약 date를 생략한다면 현재 시간을 기준으로 반환된다.

[##_Image|kage@ZmLSA/btsMCvzWxhy/JtKYSSSiRVC61lkKs9mAQK/img.png|CDM|1.3|{"originWidth":404,"originHeight":84,"style":"alignCenter"}_##]

첫 번째 파라미터에는 날짜를 표시하고자 하는 언어를 표시한다. 그리고 두번째 파라미터에는 options를 넣어 포맷하고자 하는 정보를 구체적으로 넣을 수 있다. 예를 들어 timeStyle, dateStyle 등을 통해 short, medium, full 등을 입력하면 아래 이미지처럼 결과가 다르게 나타난다.

[##_Image|kage@bZnFZQ/btsMCy4hjYz/EhwhT8TMFfA2tRr954Nr8k/img.png|CDM|1.3|{"originWidth":425,"originHeight":245,"style":"alignCenter","caption":"style에 따른 포맷"}_##]

또한 timezone을 설정할 수도 있다. 첫번째 파라미터는 단순히 시간을 표시하는 언어를 설정하는 영역이고, timezone에 의해 시간대가 설정되어 결과값이 반환된다.

[##_Image|kage@0sdO9/btsMCzWopyA/vOH8jyzpR8BjcznzMn5RP1/img.png|CDM|1.3|{"originWidth":317,"originHeight":192,"style":"alignCenter","caption":"시드니와 서울로 타임존 변환"}_##]

그 외에도 hour, minute, hour12 등의 옵션들을 통해 포맷을 다르게 정할 수 있다.

## 시간 관련 라이브러리

하지만 좀 더 손 쉽게 할 수 있는 방법으로, 시간 관련 라이브러리를 선택할 수도 있다. 그 예로 day.js, date-fns를 사용할 수 있다. 이전에는 moment.js를 많이 사용했지만 현재는 moment.js 라이브러리 내에서도 레거시로 간주하며, 유지보수만 진행하기 때문에 다른 라이브러리를 사용하는 것을 권장하고 있다.

#### **day.js : [https://github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)**

[GitHub - iamkun/dayjs: ⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API

⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API - iamkun/dayjs

github.com](https://github.com/iamkun/dayjs)

#### **date-fns : [https://date-fns.org/](https://date-fns.org/)**

[Modern JavaScript Date Utility Library

date-fns provides the most comprehensive yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.

date-fns.org](https://date-fns.org/)
