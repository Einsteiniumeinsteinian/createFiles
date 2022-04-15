const fs = require('fs')
const readline = require('readline')
const child_process = require('child_process')

const { spawn } = require('child_process')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// defauklt and continuity handle file not existence
startupPopUp()
function startupPopUp() {
  rl.question(
    '\nWhat would you like to do ? (Create, Delete, Edit, Rename, list, view, exit)',
    function (action) {
      promptcases(action)
    },
  )
}
function promptcases(action) {
  switch (action.toLowerCase()) {
    case 'delete':
      deletePrompt()
      break
    case 'create':
      createPrompt()
      break
    case 'edit':
      editPrompt()
      break
    case 'rename':
      renamePrompt()
      break
    case 'view':
      viewPrompt()
      break
    case 'list':
      listFiles()
      break
    case 'exit':
      rl.close()
      break
    default:
      invalidPrompt()
      break
  }
}

function createPrompt() {
  rl.question('Name of File: ', function (fileName) {
    rl.question('Add Contents: ', function (content) {
      createFile(fileName, content)
    })
  })
}

function createFile(fileName, content) {
  console.log(content)
  fs.writeFile(fileName, content + '\n', function (err, file) {
    if (err) throw err
    console.log('Created ' + fileName)
    startupPopUp()
  })
}

function deletePrompt() {
  rl.question('Name of File: ', function (fileName) {
    deleteFile(fileName)
  })
}

function deleteFile(fileName) {
  fs.unlink(fileName, function (err) {
    if (err) throw err
    console.log('deleted ' + fileName)
    startupPopUp()
  })
}

function renamePrompt() {
  rl.question('Name of File: ', function (fileName) {
    rl.question('New name: ', function (newName) {
      renameFile(fileName, newName)
    })
  })
}

function renameFile(fileName, newName) {
  fs.rename(fileName, newName, function (err) {
    if (err) {
        console.log('Cannot locate file to rename')
        startupPopUp()
    }
    console.log('File Renamed!')
    startupPopUp()
  })
}

function editPrompt() {
  rl.question('Name of File: ', function (fileName) {
    rl.close()
    runLinuxCmd(fileName, 'vim')
    console.log('edited')
    startupPopUp()
    // startupPopUp()
  })
}

// rl.on('close', function () {
// //   console.log('\nBYE BYE !!!')
// })

function viewPrompt() {
  rl.question('Name of File: ', function (fileName) {
    rl.close()
    runLinuxCmd(fileName, 'cat')
    startupPopUp()
  })
}

function view() {}

function runLinuxCmd(fileName, command) {
//   rl.close()
  const action = process.env.EDITOR || command
  const child = child_process.spawn(action, [`${__dirname}/${fileName}`], {
    stdio: 'inherit',
  })
  child.on('exit', function (e, code) {
      console.log('edited')
  })
}

function listFiles() {
  const ls = spawn('ls')
  ls.stdout.on('data', (data) => {
    console.log(`listed files: \n${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ls.on('error', (error) => {
    console.log(`error: ${error.message}`)
  })

  ls.on('close', (code) => {
    startupPopUp()
  })
}

function invalidPrompt() {
  console.log('invalid command')
  startupPopUp()
}

