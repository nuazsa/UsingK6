
# k6 Performance Testing Repository

Welcome to the k6 performance testing repository. This project is designed to test and benchmark API endpoints using [k6](https://k6.io/), a modern open-source load testing tool built for developers and testers.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Setup](#setup)
- [Scripts Overview](#scripts-overview)
- [Scenarios](#scenarios)
- [Metrics and Reporting](#metrics-and-reporting)

---

## Project Overview
This repository includes performance test scripts to:
- Register users via an API.
- Simulate user login and story creation.
- Measure performance metrics such as throughput, latency, and error rates.

Key features:
- Custom scenarios for different workflows.
- Metrics collection using k6's built-in tools.
- Modular script structure for reusability.

---

## Setup
### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [k6](https://k6.io/docs/getting-started/installation/).

### Installation
Clone the repository and navigate to its directory:
```bash
git clone <repository-url>
cd <repository-directory>
```

Install any required dependencies (if applicable).

---

## Scripts Overview
The repository includes the following key files:

- **src/Secenario.js**: Main k6 script defining scenarios for testing.
- **helper/user.js**: Helper functions for user-related operations such as registration and login.
- **helper/story.js**: Helper functions for story creation.

---

## Scenarios
### Defined Scenarios
1. **register_user_secenario**:
   - Executes user registration tasks.
   - Executor: `shared-iterations`.
   - Virtual Users (VUs): 5.
   - Iterations: 10.
   - Maximum Duration: 30 seconds.

2. **story_creation_secenario**:
   - Executes story creation tasks.
   - Executor: `constant-vus`.
   - Virtual Users (VUs): 5.
   - Duration: 10 seconds.

### Running Tests
Run the tests with the following command:
```bash
k6 run src/Secenario.js
```

Use the verbose flag for more detailed logs:
```bash
k6 run --verbose src/Secenario.js
```

---

## Metrics and Reporting
### Counters
- `user_registration_counter_success`:  
  Counts successful user registrations.

- `user_stories_counter_success`:  
  Counts successfully created stories.

### Viewing Metrics
After running the tests, view the metrics in the console output. For example:
```
user_registration_counter_success: 10
user_stories_counter_success: 50
```

### Advanced Reporting
Export metrics to JSON for further analysis:
```bash
k6 run --out json=output.json src/Secenario.js
```

Use visualization tools like [k6 Cloud](https://k6.io/cloud) or [Grafana](https://grafana.com/) for detailed insights.
