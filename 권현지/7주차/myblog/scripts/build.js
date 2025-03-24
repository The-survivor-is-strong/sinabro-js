import fs from 'fs';
import { mkdir , readdir, copyFile} from 'fs/promises';
// if(fs.existsSync('dist')){
//   fs.unlinkSync('dist'); // 삭제
// }

await mkdir('dist');

const files = await readdir('pages');
console.log(files);

for (const file of files){
  if(file === 'index.html'){
    await copyFile(`pages/${file}`, `dist/${file}`)
  }else{
    const folderName = file.split('.html')[0]
    await mkdir(`dist/${folderName}`)
    await copyFile(`pages/${file}`, `dist/${folderName}/index.html`)
  }
}