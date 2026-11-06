import { readFileSync, writeFileSync, mkdirSync, lstatSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createRequire } from 'node:module';

const directory=resolve(process.env.EXTRACTED_PACKAGE);
const expectedVersion=process.env.VERSION;
for(const name of ['package.json','index.js']) {
  if(!lstatSync(join(directory,name)).isFile())throw new Error('Expected a regular package file');
}
const metadata=JSON.parse(readFileSync(join(directory,'package.json'),'utf8'));
if(metadata.name!=='@coderoot-eth/release-demo' || metadata.version!==expectedVersion
  || !/^sha256:[0-9a-f]{64}$/.test(process.env.ARTIFACT_HASH??''))throw new Error('Package identity mismatch');
const {hello}=createRequire(import.meta.url)(join(directory,'index.js'));
const deployment={package:metadata.name,version:metadata.version,artifact_hash:process.env.ARTIFACT_HASH,
  greeting:hello('CodeRoot rehearsal'),built_at:new Date().toISOString(),source_run:process.env.SOURCE_RUN};
const output=resolve(process.env.SITE_DIRECTORY);
mkdirSync(output,{recursive:true});
const json=JSON.stringify(deployment,null,2)+'\n';
const escaped=json.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
writeFileSync(join(output,'deployment.json'),json);
writeFileSync(join(output,'index.html'),`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>CodeRoot release rehearsal</title><h1>CodeRoot release rehearsal</h1><pre>${escaped}</pre>\n`);
