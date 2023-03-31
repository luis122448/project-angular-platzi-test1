import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = environment.API_URL + '/api/files';
  constructor(
    private httpCliente: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.httpCliente.get(url,{responseType: 'blob'})
    .pipe(
      tap(data => {
        const blob = new Blob([data],{type})
        saveAs(blob, name)
      }),
      map(() => true)
    )
  }

  postUpload(file: Blob) {
    const dto = new FormData();
    dto.append('file',file);
    return this.httpCliente.post<File>(`${this.apiUrl}/upload`, dto, {
      // headers: {'Content-type': 'multipart/form-data'}
    });
  }

}
