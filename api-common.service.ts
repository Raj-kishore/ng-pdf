import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ExportService } from "../services/export.service"

@Injectable({
    providedIn: 'root'
})
export class ApiCommonService {
    public httpOptions: any;
    public takeoffstorage: any;
    public Userids: any;
    constructor(
        private httpClient: HttpClient,
        private ExportService: ExportService
    ) {
        this.httpOptions = {
            headers: new HttpHeaders().
                set('content-type', 'application/json').
                set('Access-Control-Allow-Origin', '*').
                set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT').
                set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization')

        };
    }



    /*Common Simple Get HTTP Method for all Modules*/
    public getRequest(url: string, method: string): Observable<any> {
        return this.httpClient.get(url)
            .pipe(
                retry(1)
            );
    }

    public getRequestParam(url: string, method, params: any): Observable<any> {
        // params = params.trim();
        // const options = params ? params : {};
        return this.httpClient.get(url, method)
            .pipe(
                retry(1)
            );
    }
    public insertRequest(url: string, method, inputparams: any): Observable<any> {
        return this.httpClient.post(url, inputparams, method)
            .pipe(
                retry(1)
            );
    }
    public updateRequest(url: string, method, inputparams: any): Observable<any> {
        return this.httpClient.put(url, inputparams, method)
            .pipe(
                retry(1)
            );
    }

    public partialRequest(url: string, method, inputparams: any): Observable<any> {
        return this.httpClient.patch(url, inputparams, method)
            .pipe(
                retry(1)
            );
    }

    public deleteRequest(url: string, method: string, inputparams: any): Observable<any> {
        return this.httpClient.delete(url, inputparams)
            .pipe(
                retry(1)
            );
    }
    //download excel code
    downloadFile(data) {
        const REQUEST_PARAMS = new HttpParams().set("fileName", data.fileName);
        return this.httpClient.get(`${environment.serverUrl}/download`, {
            responseType: "arraybuffer",
        });
    }
    downloadFileAssessment(data) {
        this.ExportService.currentMessage.subscribe(message => (this.Userids = message));
        console.log(this.Userids)
        const REQUEST_PARAMS = new HttpParams().set("fileName", data.fileName);
        return this.httpClient.post(`${environment.serverUrl}/assessments/export`, this.Userids, {
            responseType: "arraybuffer",
        });
    }
}
