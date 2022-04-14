const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What would you like to do ? ', function (action) {
    promptcases(action)
    // rl.question('Where do you live ? ', function (country) {
    //     console.log(`${action}, is a citizen of ${country}`);
    //     //   rl.close();
    // });
});

rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

function promptcases(action) {
    action.toLowerCase()
    switch (action) {
        case 'delete':
           promptDelete()
            break;
        case 'create':
            promptCreate()
            break;
        case 'edit':
            editFile(fileName)
            break;
        case 'rename':
            renameFile(fileName)
            break;

        default:
            break;
    }

    // return result.task

}



function promptCreate() {
    rl.question('Name of File: ', function (fileName) {
        rl.question('Add Contents: ', function (content) {
            createFile(fileName, content)

        })
    })
}


function createFile(fileName, content) {
    console.log(content)
    fs.writeFile(fileName, content + "\n" , function (err, file) {
        if (err) throw err
        console.log("Created " + fileName)
        rl.close();
    })
}

function promptDelete() {
    rl.question('Name of File: ', function (fileName) {
        deleteFile(fileName)
    })
}

function deleteFile(fileName) {
    fs.unlink(fileName, function (err) {
        if (err) throw err
        console.log('deleted ' + fileName)
        rl.close();
    })
}








// const prompt = require('prompt')

// prompt.start()

// console.log(' Choose Action: Delete, edit, create, rename')


// // prompter()

// // function prompter() {
// //     const fileArray = ['action', 'filename']
// //     return promptFn(fileArray)
// // }

// var test;
// actionPrompter('action')

// function actionPrompter(action) {
//     prompt.get(action, function (err, event) {
//         if (err) {
//             return onErr(err)
//         }
//         promptcases(event.action)
//     })
// }


// function promptcases(action) {
//     action.toLowerCase()
//     switch (action) {
//         case 'delete':
//             deleteFile(fileName)
//             break;
//         case 'create':
//             prompt2fn(fileName, ["text"])
//             // createFile(prompt2fn([text]))
//             break;
//         case 'edit':
//             editFile(fileName)
//             break;
//         case 'rename':
//             renameFile(fileName)
//             break;

//         default:
//             break;
//     }

//     // return result.task

// }







// // function promptFn(fileArray) {
// //     prompt.get(fileArray, function (err, result) {
// //         if (err) {
// //             return onErr(err)
// //         }
// //         console.log('Prompt 1 ran')
// //         promptcases(result.action, result.filename)
// //         // console.log('Command-line input received:')


// //     })
// // }

// // function prompt2fn(fileName, fileArray) {
// //     prompt.get(fileArray, function (err, file) {
// //         if (err) {
// //             return onErr(err)
// //         }
// //         // console.log('file at createFile')
// //         createFile(fileName, file.text)
// //     })
// // }

// // function promptcases(task, fileName) {
// //     console.log(task, fileName)
// //     task.toLowerCase()
// //     switch (task) {
// //         case 'delete':
// //             deleteFile(fileName)
// //             break;
// //         case 'create':
// //             prompt2fn(fileName, ["text"])
// //             // createFile(prompt2fn([text]))
// //             break;
// //         case 'edit':
// //             editFile(fileName)
// //             break;
// //         case 'rename':
// //             renameFile(fileName)
// //             break;

// //         default:
// //             break;
// //     }

// //     // return result.task

// // }

// function onErr(err) {
//     console.log(err)
//     return 1
// }


// function promptcreatefileProps(fileObj){
//     prompt.get(action, function (err, event) {
//         if (err) {
//             return onErr(err)
//         }

//     })
// }


// function createFile(fileName, text) {
//     fs.writeFile(fileName, text, function (err, file) {
//         if (err) throw err
//         console.log('file', file)
//     })
// }

// function editFile(fileName, text) {
//     fs.appendFile(fileName, text, function (err) {
//         if (err) throw err
//         console.log('Saved!')
//     })

// }

// function deleteFile(fileName) {
//     fs.unlink(fileName, function (err) {
//         if (err) throw err
//         console.log('File deleted!')
//     })
// }

// function renameFile(fileName) {
//     fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
//         if (err) throw err
//         console.log('File Renamed!')
//     })
// }


