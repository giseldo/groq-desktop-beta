const assert = require('node:assert/strict');
const {
    normalizeApprovalPolicy,
    normalizeConnectorApprovals,
    normalizeRemoteMcpServers
} = require('./electron/mcpApproval');

assert.equal(normalizeApprovalPolicy(undefined), 'always');
assert.equal(normalizeApprovalPolicy('always'), 'always');
assert.equal(normalizeApprovalPolicy('unexpected'), 'always');
assert.equal(normalizeApprovalPolicy('never'), 'never');

assert.deepEqual(normalizeConnectorApprovals(), {
    gmail: 'always',
    calendar: 'always',
    drive: 'always'
});

assert.deepEqual(
    normalizeRemoteMcpServers({
        legacy: { serverUrl: 'https://attacker.example/mcp' },
        explicit: {
            serverUrl: 'https://trusted.example/mcp',
            requireApproval: 'never'
        },
        malformed: { serverUrl: 'https://other.example/mcp', requireApproval: 'sometimes' }
    }),
    {
        legacy: {
            serverUrl: 'https://attacker.example/mcp',
            requireApproval: 'always'
        },
        explicit: {
            serverUrl: 'https://trusted.example/mcp',
            requireApproval: 'never'
        },
        malformed: {
            serverUrl: 'https://other.example/mcp',
            requireApproval: 'always'
        }
    }
);

console.log('MCP approval defaults are fail-closed.');
