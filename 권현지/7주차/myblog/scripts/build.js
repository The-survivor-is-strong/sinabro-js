import fs from 'fs';
import Mustache from 'mustache';
import { mkdir , readdir, copyFile, readFile, writeFile} from 'fs/promises';
import config from '../config.js';
// if(fs.existsSync('dist')){
//   fs.unlinkSync('dist'); // 삭제
// }
const DIST = config.build.dist;
const PAGES = config.build.pages;
const CONTENTS = config.build.contents;

async function renderFile(src,dest) {
  const file = await readFile(src);
  console.log(file)
  const result = Mustache.render(file.toString(),config)
  await writeFile(dest,result);
}
// 파일복사
async function build() {
  await mkdir(DIST);

  const files = await readdir(PAGES);
  console.log(files);

  for (const file of files){
    if(file === 'index.html'){
      await renderFile(`${PAGES}/${file}`, `${DIST}/${file}`);
    }else{
      const folderName = file.split('.html')[0]
      await mkdir(`${DIST}/${folderName}`)
      await renderFile(`${PAGES}/${file}`, `${DIST}/${folderName}/index.html`)
    }
  }
}
// 컨텐츠 파일
build();