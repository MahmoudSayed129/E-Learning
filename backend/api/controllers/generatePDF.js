module.exports.pdfTemplate = (title, notes) => {
    let body = `<h2>Notes of ${title} Course : </h2> <hr />`;
    for (let index = 0; index < notes.length; index++) {
        body += `<span class='my-3'>${index + 1} - On Video : ${notes[index].title}.</span> <br />
                <span class='mb-3'style="font weight:bolder; color :red;">- ${notes[index].note}</span>  <hr />` ;
    };
    return ( `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
       </head>
       <body>
         ${body}
       </body>
    </html>
    `);
};

module.exports.certificateTemplate = (title, username, instructor) => {
    console.log(`${__dirname}/PDFs/logo.png`);
    return ( `
    <html>
    <head>
        <style type='text/css'>
            body, html {
                margin: 0;
                padding: 0;
            }
            body {
                color: black;
                display: table;
                font-family: Georgia, serif;
                font-size: 24px;
                text-align: center;
            }
            .container {
                border: 20px solid rgb(224, 91, 73);
                width: 750px;
                height: 563px;
                display: table-cell;
                vertical-align: middle;
            }
            .logo {
                color: rgb(224, 91, 73);
            }

            .marquee {
                color: rgb(224, 91, 73);
                font-size: 48px;
                margin: 20px;
            }
            .assignment {
                margin: 20px;
            }
            .person {
                border-bottom: 2px solid black;
                font-size: 32px;
                font-style: italic;
                margin: 20px auto;
                width: 400px;
            }
            .reason {
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src='data:image/png;base64,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' width='300px' alt=${`${__dirname}/PDFs/logo.png`}/>
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                ${username}
            </div>

            <div class="reason">
                for completing ${title} Course <br/>
                given by instructor : ${instructor} 
            </div>
        </div>
    </body>
</html>
    `);
};