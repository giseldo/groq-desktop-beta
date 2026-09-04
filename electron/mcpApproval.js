const APPROVAL_ALWAYS = 'always';
const APPROVAL_NEVER = 'never';

function normalizeApprovalPolicy(value) {
    return value === APPROVAL_NEVER ? APPROVAL_NEVER : APPROVAL_ALWAYS;
}

function normalizeConnectorApprovals(approvals) {
    const source = approvals && typeof approvals === 'object' ? approvals : {};
    return {
        gmail: normalizeApprovalPolicy(source.gmail),
        calendar: normalizeApprovalPolicy(source.calendar),
        drive: normalizeApprovalPolicy(source.drive)
    };
}

function normalizeRemoteMcpServers(servers) {
    if (!servers || typeof servers !== 'object' || Array.isArray(servers)) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(servers).flatMap(([id, config]) => {
            if (!config || typeof config !== 'object' || Array.isArray(config)) {
                return [];
            }
            return [[id, {
                ...config,
                requireApproval: normalizeApprovalPolicy(config.requireApproval)
            }]];
        })
    );
}

function normalizeMcpApprovalSettings(settings) {
    return {
        ...settings,
        googleConnectorsApproval: normalizeConnectorApprovals(settings.googleConnectorsApproval),
        remoteMcpServers: normalizeRemoteMcpServers(settings.remoteMcpServers)
    };
}

module.exports = {
    APPROVAL_ALWAYS,
    APPROVAL_NEVER,
    normalizeApprovalPolicy,
    normalizeConnectorApprovals,
    normalizeRemoteMcpServers,
    normalizeMcpApprovalSettings
};
