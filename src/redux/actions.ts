import { TestAction } from './types';

export function test(): TestAction {
  return { type: 'TEST' };
}
