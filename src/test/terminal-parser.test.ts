import { describe, it, expect } from 'vitest'
import { parseCommand, getHumorousResponse } from '@/lib/terminal-parser'

describe('parseCommand', () => {
  it('should parse simple command', () => {
    const result = parseCommand('help')
    expect(result).toEqual({ command: 'help', args: [] })
  })

  it('should parse command with arguments', () => {
    const result = parseCommand('echo hello world')
    expect(result).toEqual({ command: 'echo', args: ['hello', 'world'] })
  })

  it('should handle empty input', () => {
    const result = parseCommand('')
    expect(result).toEqual({ command: '', args: [] })
  })

  it('should handle whitespace-only input', () => {
    const result = parseCommand('   ')
    expect(result).toEqual({ command: '', args: [] })
  })

  it('should trim and normalize whitespace', () => {
    const result = parseCommand('  help   ')
    expect(result).toEqual({ command: 'help', args: [] })
  })

  it('should convert command to lowercase', () => {
    const result = parseCommand('HELP')
    expect(result).toEqual({ command: 'help', args: [] })
  })

  it('should handle multiple spaces between arguments', () => {
    const result = parseCommand('echo    hello    world')
    expect(result).toEqual({ command: 'echo', args: ['hello', 'world'] })
  })
})

describe('getHumorousResponse', () => {
  it('should return specific response for sudo', () => {
    const response = getHumorousResponse('sudo')
    expect(response).toBe('Nice try. You have no power here.')
  })

  it('should return specific response for rm', () => {
    const response = getHumorousResponse('rm')
    expect(response).toBe('I\'m not falling for that one.')
  })

  it('should return specific response for hack', () => {
    const response = getHumorousResponse('hack')
    expect(response).toBe('This is a portfolio, not The Matrix.')
  })

  it('should return specific response for cat', () => {
    const response = getHumorousResponse('cat')
    expect(response).toBe('🐱 Meow? Wrong kind of cat. Try "help".')
  })

  it('should return specific response for ping', () => {
    const response = getHumorousResponse('ping')
    expect(response).toBe('Pong! 🏓')
  })

  it('should return generic response for unknown command', () => {
    const response = getHumorousResponse('foobar')
    expect(response).toContain('foobar')
    expect(response.toLowerCase()).toContain('help')
  })

  it('should never throw on random input', () => {
    expect(() => getHumorousResponse('asdfghjkl')).not.toThrow()
    expect(() => getHumorousResponse('123')).not.toThrow()
    expect(() => getHumorousResponse('!@#$%')).not.toThrow()
  })

  it('should always return a string', () => {
    const response = getHumorousResponse('randomcommand')
    expect(typeof response).toBe('string')
    expect(response.length).toBeGreaterThan(0)
  })
})
