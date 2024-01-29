import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    download(input:{event:any, name: string}) {
        let data = input.event as HttpResponse<Blob> ;
        const downloadedFile = new Blob([data.body as BlobPart], {
            type: data.body?.type
        });
        if (downloadedFile.type != "") {
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = input.name;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
        }
    }
}