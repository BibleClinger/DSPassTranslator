let alphabet = "ZQMTH3L2J8RKBW94FP5SCNGX7D";

function setLevelScore(level, score)
{
  levelInput.value = level;
  scoreInput.value = score;
  scoreSlider.value = score;
}

function setNotification(msg)
{
  let notification = document.querySelector("#notification");
  notification.innerHTML = msg;
  notification.opened = true;
}

function decipherPassword()
{
  passwordInput = document.querySelector("#passwordInput");

  pw = passwordInput.value;
  pw_array = [];
  sum = 0, remainder=0, level=0, score=0;

  if(pw.toUpperCase() == "GTSTFTC")
  {
    setNotification("Error: You entered a code for 5 lives.");
    return;
  }
  else if(pw.toUpperCase() == "BS9JS27")
  {
    setNotification("Error: You entered a code for 10 lives.");
    return;
  }

  if(pw.length != 7)
  {
    // Complain. Set invalid. Return
    setNotification("Error: Password length is not 7!");
    return;
  }
  for (p of pw)
  {
    p = p.toUpperCase(); // Maybe move this to validation handling.
    i = alphabet.indexOf(p);
    if(i == -1)
    {
      setNotification("Error: Invalid password character found: " + p);
      return;
    }
    pw_array.push(i);
  }
  // We have enough valid entries to make a determination.
  // Check validation.
  // Set valid indication.
  for (x of pw_array.slice(0,6))
  {
      sum += alphabet.charCodeAt(x);
  }
  sum -= 0x0186;
  remainder = sum % 0x001a;
  if(pw[6] == alphabet[remainder])
  {
    level = (pw_array[0] - pw_array[5]) / 2;
    level = Math.floor(level);
    if(level > 4 || level < 1) // Level 1 is actually level 2, and so on.
    {
      setNotification("Erorr: Password selects invalid level: " + level);
      return;
    }
    multiplier = 1000000;
    for (x of pw_array.slice(1,5))
    {
      digit = x - (4 * (level - 1))
      if(digit < 0)
      {
        setNotification("Error: Invalid score encoding: " + digit);
        return;
      }
      score += digit * multiplier;
      multiplier /= 10;
    }
    if((pw_array[5] - (4-level)) != (pw_array[4] - (4 * (level - 1))))
    {
      //j = thousands + (4 - level); // +3, +2, +1, +0
      setNotification("Error: Invalid level encoding based on score.");
      return;
    }
    // Valid code
    setNotification("Success: Level: (" + (level+1) + ") + Score: (" + score + ")");
    setLevelScore(level+1, score);
  }
  else setNotification("Error: Password checksum validation failed. Calculating " + alphabet[remainder]);
}

function generatePassword()
{
  // Generate password.
  // 1. Use level to calculate score encoding.
  // 2. Encode score.
  // 3. Encode j based on 1000's digit. +1
  // 4. Encode i based on j. We have options here, but maybe keep it simple. level = ((i - j) / 2) -1, so i = ((level+1) * 2) + j
  // 5. Calculate checksum.
  level = levelInput.value - 1;
  score = scoreInput.value;
  // Break down score.
  millions = Math.floor( (score % 10000000) / 1000000 );
  hthousands = Math.floor( (score % 1000000) / 100000 );
  tthousands = Math.floor( (score % 100000) / 10000 );
  thousands = Math.floor( (score % 10000) / 1000 );
  // Encode
  password = "";
  j = thousands + (4 - level); // +3, +2, +1, +0
  i = (level * 2) + j;
  console.log("level: " + level);
  console.log("i: " + i);
  console.log("millions: " + millions);
  console.log("hthousands: " + hthousands);
  console.log("tthousands: " + tthousands);
  console.log("thousands: " + thousands);
  console.log("j: " + j);

  multiplier = (level-1) * 4;
  millions += multiplier;
  hthousands += multiplier;
  tthousands += multiplier;
  thousands += multiplier;

  console.log("multiplier: " + multiplier);
  console.log("millions: " + millions);
  console.log("hthousands: " + hthousands);
  console.log("tthousands: " + tthousands);
  console.log("thousands: " + thousands);

  sum = alphabet.charCodeAt(i) + alphabet.charCodeAt(millions) + alphabet.charCodeAt(hthousands) + alphabet.charCodeAt(tthousands) + alphabet.charCodeAt(thousands) + alphabet.charCodeAt(j);

  console.log("Sum before subtraction: " + sum);
  sum -= 0x0186;
  if(sum < 0)
  {
    sum = (sum >>> 0) & 0x0000FFFF; // convert sum to a 16-bit unsigned number.
    console.log("sum converted to unsigned: " + sum);
    //setNotification("Error: Currently unable to encode score at this level. Perhaps a bug?");
  }
  console.log("Sum after subtraction: " + sum);
  remainder = sum % 0x001a;
  console.log("Remainder: " + remainder);
  console.log("Checksum character: " + alphabet[remainder]);
  password = alphabet[i] + alphabet[millions] + alphabet[hthousands] + alphabet[tthousands] + alphabet[thousands] + alphabet[j] + alphabet[remainder];
  setPassword(password);
}

function setPassword(password)
{
  passwordInput.value = password;
  setNotification("Success: Encoded password " + password);
}

function copyPassword(event)
{
  copy(passwordInput.value);
}

function copyPreset5(event)
{
  copy("GTSTFTC");
}

function copyPreset10(event)
{
  copy("BS9JS27");
}

function copy(txt)
{
  navigator.clipboard.writeText(txt);
  setNotification("Copied: " + txt);
}

function scoreSliderChange(event)
{
  scoreInput.value = scoreSlider.value
}

function scoreInputTextChange(event)
{
  score = scoreInput.value;
  score /= 1000;
  score = Math.floor(score);
  score *= 1000;
  scoreInput.value = score;
  scoreSlider.value = score;
}

function scoreInputTextEnd(event)
{
  score = scoreInput.value;
  score /= 1000;
  score = Math.floor(score);
  score *= 1000;
  scoreInput.value = score;
  scoreSlider.value = score;
}

function passwordInputTextEnd(event)
{
  // Stop spinner.
  // validate.

}

document.addEventListener("DOMContentLoaded", () => {
  window.decipherButton = document.querySelector("#decipherButton");
  window.generateButton = document.querySelector("#generateButton");
  window.copyPasswordIcon = document.querySelector("#copyPasswordIcon");
  window.copy5 = document.querySelector("#copy5");
  window.copy10 = document.querySelector("#copy10");
  window.scoreSlider = document.querySelector("#scoreSlider");
  window.scoreInput = document.querySelector("#scoreInput");
  window.passwordInput = document.querySelector("#passwordInput");
  window.versionLabel = document.querySelector("#versionLabel");

  //copyPasswordIcon.ptrText = passwordInput;
  //copy5.ptrText = document.querySelector("#label5");
  //copy10.ptrText = document.querySelector("#label10");

  decipherButton.addEventListener('click', decipherPassword);
  generateButton.addEventListener('click', generatePassword);
  copyPasswordIcon.addEventListener('click', copyPassword);
  copy5.addEventListener('click', copyPreset5);
  copy10.addEventListener('click', copyPreset10);
  scoreSlider.addEventListener('change', scoreSliderChange);
  scoreInput.addEventListener('textinputmodeend', scoreInputTextEnd);
  scoreInput.addEventListener('change', scoreInputTextChange);
  passwordInput.addEventListener('textinputmodeend', passwordInputTextEnd);

  require('electron').ipcRenderer.on('version', (event, version) => {
      console.log(version);
      versionLabel.innerHTML = version;
    })
});
