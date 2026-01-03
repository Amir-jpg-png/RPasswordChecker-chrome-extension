# RPasswordChecker

This is a simple Chrome extension written in React.
It lets you enter a password and validates it, inspired by NIST standards and guidelines.

## Features

The password checker can detect the length of a password, if it was discovered in a data breach, and uses the amount of special characters to estimate entropy however the user is not forced to add special characters as this leads to users repeating the same passwords as to not forget them. If you want to find out more about [NIST GUIDELINES](https://pages.nist.gov/800-63-4/sp800-63b/passwords/) follow the link.

## Installation and Usage

Installation:

To install it you can pull this repo. Cd into the directory then build from source.

```bash
git clone https://github.com/Amir-jpng-png/RPasswordChecker

cd RPasswordChecker

npm run build

ls
```

You should now see a `dist` directory.

Open your browser and type `chrome://extensions` in the search bar, click on load unpacked and select the dist directory we built earlier.
You have successfully set up RPasswordChecker, if you want you can pin it in your browser.

Usage:

Once you open the extension you can define whether you are creating the password for a privileged account if yes click on the checkbox next to the password.
Then you just enter your password and it is determined whether this is a valid password or not if it is not valid you will get one or more error messages describing the problem with your password. The last feature is a password strength the extension calculates the password strength using various metrics such as special characters contained and so on.

## Recommendations

I recommend you always use a passphrase or a randomly generated password and to save it in a trustworthy password manager.

An example would be "React Password Checker is a cool Chrome extension" or if you want to make it safer "Re%ct Passw&rd Che/ker is a c67ol c$rome ext?nsion" but then again I would use a password manager.

## Final Notes

This was a fun project. Please keep in mind that this project was built for educational purposes and to help me learn how to build Chrome extensions.

While it can be useful for generating personal passwords, if you are creating passwords for security-critical systems, you should rely on more established and trustworthy tools and services.

Total time spent: ~1.5 hours
