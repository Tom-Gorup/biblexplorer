import type { TribeMeta } from '../types';
import { tribeColorMap } from '../utils/tribeColors';

export const tribes: TribeMeta[] = [
  { id: 'pre-tribal', displayName: 'Pre-Tribal (Adam to Jacob)', ...tribeColorMap['pre-tribal'], chapter: '1 Chr 1:1-27' },
  { id: 'judah',      displayName: 'Judah',                      ...tribeColorMap.judah,         chapter: '1 Chr 2:3-4:23' },
  { id: 'levi',       displayName: 'Levi',                       ...tribeColorMap.levi,          chapter: '1 Chr 6:1-81' },
  { id: 'benjamin',   displayName: 'Benjamin',                   ...tribeColorMap.benjamin,      chapter: '1 Chr 7:6-12; 8:1-40' },
  { id: 'reuben',     displayName: 'Reuben',                     ...tribeColorMap.reuben,        chapter: '1 Chr 5:1-10' },
  { id: 'simeon',     displayName: 'Simeon',                     ...tribeColorMap.simeon,        chapter: '1 Chr 4:24-43' },
  { id: 'gad',        displayName: 'Gad',                        ...tribeColorMap.gad,           chapter: '1 Chr 5:11-22' },
  { id: 'issachar',   displayName: 'Issachar',                   ...tribeColorMap.issachar,      chapter: '1 Chr 7:1-5' },
  { id: 'naphtali',   displayName: 'Naphtali',                   ...tribeColorMap.naphtali,      chapter: '1 Chr 7:13' },
  { id: 'manasseh',   displayName: 'Manasseh',                   ...tribeColorMap.manasseh,      chapter: '1 Chr 7:14-19' },
  { id: 'ephraim',    displayName: 'Ephraim',                    ...tribeColorMap.ephraim,       chapter: '1 Chr 7:20-29' },
  { id: 'asher',      displayName: 'Asher',                      ...tribeColorMap.asher,         chapter: '1 Chr 7:30-40' },
  { id: 'dan',        displayName: 'Dan',                        ...tribeColorMap.dan,           chapter: '1 Chr 2:2' },
  { id: 'zebulun',    displayName: 'Zebulun',                    ...tribeColorMap.zebulun,       chapter: '1 Chr 2:1' },
  { id: 'edom',       displayName: 'Edom (Esau)',                ...tribeColorMap.edom,          chapter: '1 Chr 1:35-54' },
  { id: 'ishmael',    displayName: 'Ishmael',                    ...tribeColorMap.ishmael,       chapter: '1 Chr 1:29-31' },
];
