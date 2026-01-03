import { useState, useEffect } from "react";

async function loadPwlist(): Promise<string[]> {
  const response = await fetch("pwlist.json");
  const pwlist = await response.json();
  return pwlist;
}

type PasswordStrength = "weak" | "medium" | "strong";

function App() {
  const [password, setPassword] = useState<string>("");
  const [infoString, setInfoString] = useState<string>();
  const [pwlist, setPwlist] = useState<string[]>();
  const [isPrivileged, setIsPrivileged] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>();
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    loadPwlist().then(setPwlist);
  }, []);

  const minLength = isPrivileged ? 16 : 8;

  function handleAccountTypeChange() {
    setIsPrivileged((prev: boolean) => !prev);
  }

  function calculatePasswordStrength(
    password: string
  ): "weak" | "medium" | "strong" {
    const passLength = password.length;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    let score = 0;

    if (passLength >= 8) score += 1;
    if (passLength >= 16) score += 1;
    if (hasUpper) score += 1;
    if (hasLower) score += 1;
    if (hasNumber) score += 1;
    if (hasSymbol) score += 1;

    if (score <= 2) return "weak";
    else if (score <= 4) return "medium";
    else return "strong";
  }

  function validatePassword() {
    if (!password) {
      setPasswordStrength(undefined);
      setInfoString(undefined);
      setIsValid(true);
      return;
    }
    let s = "";
    const pass = password;

    if (pwlist?.includes(pass)) {
      s += "Password was in many data breaches. ";
      setIsValid(false);
    }

    const passLength = pass.length;
    if (passLength < minLength) {
      s += `Password needs to be at least ${minLength} characters long. `;
      setIsValid(false);
    } else if (passLength > 64) {
      s += "Password should not have more than 64 characters. ";
      setIsValid(false);
    } else if (!pwlist?.includes(pass)) {
      setIsValid(true);
    }

    const strength = calculatePasswordStrength(pass);
    setPasswordStrength(strength);

    if (!s && strength === "weak") {
      s =
        "We would not recommend using this as a password. Try a longer passphrase";
    }
    if (!s && strength === "medium") {
      s = "Password is okay but consider using a longer passphrase.";
    } else if (!s && strength === "strong") {
      s = "Password looks strong!";
    }

    setInfoString(s);
  }

  useEffect(() => {
    validatePassword();
  }, [password, isPrivileged, pwlist]);

  function getPassStrengthColor(): string {
    if (passwordStrength == "weak") {
      return "text-red-500";
    } else if (passwordStrength == "medium") {
      return "text-yellow-500";
    } else if (passwordStrength == "strong") {
      return "text-green-500";
    }
    return "text-white";
  }

  return (
    <div className="w-md bg-sky-950 text-white p-5 rounded-md">
      <h1 className="text-xl mb-5">Password Security Checker</h1>
      <input
        placeholder="password..."
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        className="bg-sky-800 mr-2 px-2 py-1 rounded-md mt-2"
      />
      <label htmlFor="checkbox ">Privileged</label>
      <input
        id="first"
        type="checkbox"
        className="w-4 h-4 text-blue-800 ml-2"
        checked={isPrivileged}
        onChange={() => {
          handleAccountTypeChange();
          validatePassword();
        }}
      ></input>
      <p className={"px-2 mb-2 italic " + getPassStrengthColor()}>
        {passwordStrength}
      </p>

      <button
        className="bg-sky-700 py-1 px-2 rounded-xl hover:bg-sky-600"
        onClick={validatePassword}
      >
        Check Password
      </button>
      {!isValid && (
        <div className="bg-red-700 px-5 py-3 m-5 ml-0 rounded-md">
          Error:
          <br />
          {infoString}
        </div>
      )}
    </div>
  );
}

export default App;
