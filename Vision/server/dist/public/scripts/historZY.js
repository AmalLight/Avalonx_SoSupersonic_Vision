"use strict";
function historZY(event, hist, saveFile) {
    const query = 'values1b';
    var car = 0;
    var text = '';
    const to_remove = 4;
    const key_to_stop = [' ', '\n', '\t', '\r'];
    const selected = textarea.getSelection(query);
    if (event.keyCode == 32 ||
        event.keyCode == 37 || event.keyCode == 39 ||
        event.keyCode == 8 || event.keyCode == 46 ||
        event.keyCode == 222 || (event.keyCode == 50 && event.shiftKey)) {
        car = textarea.getCaret(query);
        text = textarea.getValue(query);
    }
    if (event.keyCode == 222 ||
        (event.keyCode == 50 && event.shiftKey))
        if (selected) {
            if (event.preventDefault)
                event.preventDefault();
            textarea.delPosCurrentRow(query, selected.length);
            textarea.setCaretxy(query, car, textarea.updateCurrentRowValue(query, (event.keyCode == 222 ? "'" : '"') + selected +
                (event.keyCode == 222 ? "'" : '"')));
        }
        else
            ;
    else if (event.keyCode == 8 && car >= to_remove &&
        text.substring(car - to_remove, car) == '    ')
        if (!selected) {
            if (event.preventDefault)
                event.preventDefault();
            textarea.setValue(query, text.substring(0, car - to_remove) +
                text.substring(car));
            textarea.setCaret(query, (car - to_remove < 1 ? 1 : car - to_remove));
        }
        else
            ;
    else if (event.keyCode == 46 && car <= text.length &&
        text.substring(car, car + to_remove) == '    ')
        if (!selected) {
            if (event.preventDefault)
                event.preventDefault();
            textarea.setValue(query, text.substring(0, car) +
                text.substring(car + to_remove));
            textarea.setCaret(query, car);
        }
        else
            ;
    else if (event.keyCode == 90 && event.ctrlKey) {
        if (event.preventDefault)
            event.preventDefault();
        hist.add(query);
        readHist(query, hist.prev());
        saveFile.saveTheFile();
    }
    else if (event.keyCode == 89 && event.ctrlKey) {
        if (event.preventDefault)
            event.preventDefault();
        readHist(query, hist.next());
        saveFile.saveTheFile();
    }
    else if (event.keyCode == 9) {
        if (event.preventDefault)
            event.preventDefault();
        textarea.updateCurrentRowValue(query, '    ');
    }
    else if (event.keyCode == 37 && event.ctrlKey) {
        if (event.preventDefault)
            event.preventDefault();
        text = text.substring(0, car);
        const i = text.lastIndexOf('°');
        if (i > -1)
            if (i == 0)
                textarea.setCaret(query, 1);
            else
                textarea.setCareti(query, i);
    }
    else if (event.keyCode == 39 && event.ctrlKey) {
        if (event.preventDefault)
            event.preventDefault();
        car = textarea.getCaret(query, false);
        text = text.substring(car);
        const i = text.indexOf('°');
        if (i > -1)
            if (car + i == 0)
                textarea.setCaret(query, 1);
            else
                textarea.setCareti(query, car + i);
    }
    else if (event.keyCode == 32 && event.ctrlKey) {
        if (event.preventDefault)
            event.preventDefault();
        var carx = car;
        while (carx > 0 &&
            key_to_stop.indexOf(text[carx - 1]) == -1)
            carx--;
        var cary = car;
        while (cary < text.length &&
            key_to_stop.indexOf(text[cary]) == -1)
            cary++;
        if (!(carx == cary && carx == 0))
            textarea.setCaretxy(query, carx, cary);
    }
    else if (event.keyCode == 171 && event.ctrlKey)
        if (selected) {
            if (event.preventDefault)
                event.preventDefault();
            hist.add(query);
            var final_string = '';
            selected.split('\n').forEach((element) => {
                final_string += '    ' + element + '\n';
            });
            final_string = final_string.substring(0, final_string.length - 1);
            textarea.insertNewSelection(query, final_string);
        }
        else
            ;
    else if (event.keyCode == 173 && event.ctrlKey)
        if (selected) {
            if (event.preventDefault)
                event.preventDefault();
            hist.add(query);
            var final_string = '';
            selected.split('\n').forEach((element) => {
                final_string = element + '\n';
                while (final_string.indexOf(' ') == 0)
                    final_string = final_string.substring(1);
            });
            final_string = final_string.substring(0, final_string.length - 1);
            textarea.insertNewSelection(query, final_string);
        }
        else
            ;
    if ([17, 20, 35, 36, 89, 90].indexOf(event.keyCode) == -1) {
        point_reset();
        hist.reset();
    }
}
