## ADDED Requirements

### Requirement: Web auth logout SPI is exposed on the public web contract
系统 SHALL 在 web 认证相关 API/Adaptor 契约中提供 `logoutWebAuth()` 方法，使下游可以通过统一抽象触发平台专有的远端认证退出动作。

#### Scenario: Web API 实现了退出能力
- **WHEN** 消费者调用一个已实现该能力的 Web API 实例的 `logoutWebAuth()`
- **THEN** 系统 SHALL 成功执行该平台的远端退出动作
- **AND** 系统 SHALL 返回成功结果给调用方

#### Scenario: Web 包装器透传退出能力
- **WHEN** 消费者通过 `WebAdaptor` 调用 `logoutWebAuth()`
- **THEN** 系统 SHALL 将调用透传给内部的 Web API 实例
- **AND** 系统 SHALL 返回与底层实现一致的结果

### Requirement: 默认 Web API 实现必须失败快
系统 SHALL 为未覆盖该能力的平台提供默认 `logoutWebAuth()` 实现，并在平台不支持远端退出时明确失败，而不是伪造成功。

#### Scenario: 子类未覆盖退出能力
- **WHEN** 消费者调用基础 `WebApi` 或未实现该方法的 Web 子类的 `logoutWebAuth()`
- **THEN** 系统 SHALL 抛出未实现或等效的明确错误
- **AND** 系统 MUST NOT 返回伪造的成功结果
- **AND** 系统 MUST NOT 默默吞掉该缺失能力
