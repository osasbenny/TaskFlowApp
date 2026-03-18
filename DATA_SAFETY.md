# Data Safety & Security

**Version**: 1.0.0  
**Last Updated**: March 2026

## Data Safety Summary

TaskFlow prioritizes your privacy and data security. This document provides detailed information about how the App handles, stores, and protects your data.

## Data Collection Practices

### What Data We Collect

TaskFlow collects **only the data you explicitly create** within the App:

- Task titles and descriptions
- Task notes and details
- Due dates and times
- Priority levels
- Category assignments
- Completion status
- User preferences (theme, notification settings)

### What Data We Do NOT Collect

The App does **not** collect:

- Personal identification information (name, email, phone number)
- Location data or GPS information
- Device identifiers or advertising IDs
- Browser history or app usage analytics
- Contacts or calendar information (unless you explicitly share)
- Financial or payment information
- Biometric data
- Health or fitness information

## Data Storage

### Storage Location

All data is stored **exclusively on your device** using AsyncStorage, a secure local storage mechanism provided by React Native.

### Storage Security

- **Encryption**: Data is stored using your device's built-in security mechanisms
- **Access Control**: Only the TaskFlow App can access its stored data
- **No Cloud Backup**: Data is not automatically backed up to cloud services
- **No Synchronization**: Data does not sync across devices

### Storage Limits

AsyncStorage typically supports up to 10MB of data per app, sufficient for thousands of tasks.

## Data Sharing

TaskFlow **does not share your data** with:

- Third-party companies or services
- Advertising networks
- Analytics providers
- Social media platforms
- Government agencies (except as required by law)
- Other apps or services

Your data remains entirely under your control.

## Data Retention

- **Active Use**: Data is retained as long as you keep the App installed
- **After Deletion**: When you delete a task, it is permanently removed from your device
- **App Uninstall**: Uninstalling the App removes all associated data
- **Device Reset**: Factory resetting your device removes all App data

## Security Measures

### Device-Level Security

The App relies on your device's built-in security features:

- **iOS**: Secure Enclave and Data Protection
- **Android**: Android Keystore and File Encryption

### App-Level Security

- **No Network Communication**: The App does not transmit data over the internet
- **No External Dependencies**: The App does not rely on external services for core functionality
- **Minimal Permissions**: The App requests only necessary permissions
- **Open Source**: The codebase is transparent and auditable

## Permissions

The App requests the following permissions:

| Permission | Purpose | When Used | Can Disable |
|-----------|---------|-----------|------------|
| **Notifications** | To deliver task reminders | When reminder is scheduled | Yes, in Settings |
| **Calendar** (future) | To integrate with device calendar | When syncing to calendar | Yes, in Settings |

## Data Breach Response

In the unlikely event of a security issue:

1. We will investigate the issue immediately
2. We will notify affected users through the App and GitHub repository
3. We will provide guidance on protecting your data
4. We will implement fixes and release updates

## User Rights

You have the following rights regarding your data:

- **Access**: You can view all your data within the App
- **Modification**: You can edit or update any task
- **Deletion**: You can delete individual tasks or all data
- **Portability**: You can export your data (future feature)
- **Control**: You have full control over your data at all times

## Compliance

TaskFlow complies with:

- **GDPR** (General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **COPPA** (Children's Online Privacy Protection Act)
- **LGPD** (Lei Geral de Proteção de Dados)

## Third-Party Libraries

TaskFlow uses the following open-source libraries:

| Library | Purpose | Data Access |
|---------|---------|------------|
| **Zustand** | State management | None |
| **AsyncStorage** | Local data storage | Task data only |
| **Expo** | Framework | None (offline mode) |
| **NativeWind** | UI styling | None |
| **React Native** | Mobile framework | None |

None of these libraries collect or transmit data.

## Recommendations for Users

To maximize your privacy and security:

1. **Keep Your Device Updated**: Install security updates for your operating system
2. **Use Device Lock**: Protect your device with a PIN, password, or biometric authentication
3. **Review Permissions**: Regularly review App permissions in your device settings
4. **Backup Your Data**: Consider backing up your device to protect against data loss
5. **Uninstall Unused Apps**: Remove apps you no longer use

## Contact & Support

For questions about data safety or privacy:

- Open an issue on our [GitHub repository](https://github.com/osasbenny/TaskFlowApp)
- Review our [Privacy Policy](./PRIVACY.md)
- Check our [README](./README.md) for additional information

## Changes to This Document

We may update this Data Safety document to reflect changes in our practices or applicable laws. Updates will be posted in the App and on our website.

---

**Commitment**: TaskFlow is committed to maintaining the highest standards of data privacy and security. Your trust is our most valuable asset.
