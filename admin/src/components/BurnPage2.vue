<template>
    <h4 align="center">A Serial Flasher utility for Espressif chips</h4>
    <div id="safariErr" style="display:none"><p align="center" style="color:red">This tool is not supported on Safari browser!</p></div>
    <div class="container" id="main">
        <hr/>
        <div id="program">
            <h3> Program </h3>
            <label for="baudrates" id="lblBaudrate">Baudrate:</label>
            <label style="display:none" id="lblConnTo">Connected to device: </label>
            <select name="baudrates" id="baudrates">
                <option value="921600">921600</option>
                <option value="460800">460800</option>
                <option value="230400">230400</option>
                <option value="115200">115200</option>
            </select>

            <br><br>

            <input class="btn btn-info btn-sm" type="button" id="connectButton" value="Connect" />
            <input class="btn btn-info btn-sm" type="button" id="copyTraceButton" value="Copy Trace" />
            <input class="btn btn-warning btn-sm" type="button" id="disconnectButton" value="Disconnect" />
            <input class="btn btn-danger btn-sm" type="button" id="eraseButton" value="Erase Flash" />
            <br>

            <div class="alert alert-danger alert-dismissible" id="alertDiv" style="display:none; margin-top:10px">
                <a href="#" class="close" aria-label="close" onclick="$('.alert').hide()">&times;</a>
                <span id="alertmsg"></span>
            </div>

            <div id="files">
                <table class="table table-striped" id="fileTable">
                    <thead class="thead-light">
                        <tr>
                            <th>Flash Address</th>
                            <th>File</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                </table>
                <input class="btn btn-info btn-sm" type="button" id="addFile" value="Add File" />
                <input class="btn btn-info btn-sm" type="button" id="programButton" value="Program" />
            </div>
            <output id="list"></output>
            <hr/>
        </div>
    </div>
</template>