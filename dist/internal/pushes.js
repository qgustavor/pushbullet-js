import mime from 'mime';
import PushBullet from '../pushbullet';
PushBullet.prototype.note = function note(deviceParams, title, body) {
    const pushParameters = {
        type: 'note',
        title,
        body
    };
    return this.push(deviceParams, pushParameters);
};
PushBullet.prototype.link = function link(deviceParams, title, url, body) {
    return this.push(deviceParams, {
        type: 'link',
        title,
        url,
        body
    });
};
PushBullet.prototype.file = async function file(deviceParams, file, body) {
    const fileType = mime.getType(file.name);
    const uploadRequestResponse = await fetch(PushBullet.UPLOAD_END_POINT, {
        method: 'post',
        body: JSON.stringify({
            file_name: file.name,
            file_type: fileType
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': this.apiKey
        }
    });
    const uploadRequestResponseJson = await uploadRequestResponse.json();
    const formData = new FormData();
    formData.append('file', file);
    const uploadFileResponse = await fetch(uploadRequestResponseJson.upload_url, {
        method: 'post',
        body: formData
    });
    if (uploadFileResponse.status !== 204) {
        throw new Error('file upload error');
    }
    return this.push(deviceParams, {
        type: 'file',
        file_name: file.name,
        file_type: fileType,
        file_url: uploadRequestResponseJson.file_url,
        body
    });
};
PushBullet.prototype.push = function push(deviceParams, bullet) {
    if (typeof deviceParams === 'string') {
        if (deviceParams.indexOf('@') !== -1) {
            bullet.email = deviceParams;
        }
        else {
            bullet.device_iden = deviceParams;
        }
    }
    else if (typeof deviceParams === 'number') {
        bullet.device_id = deviceParams;
    }
    else if (typeof deviceParams === 'object') {
        for (const param in deviceParams) {
            bullet[param] = deviceParams[param];
        }
    }
    return this.makeRequest('post', PushBullet.PUSH_END_POINT, { json: bullet });
};
PushBullet.prototype.history = function history(options = {}) {
    if (options.active === undefined) {
        options.active = true;
    }
    if (options.modified_after === undefined) {
        options.modified_after = 0;
    }
    return this.getList(PushBullet.PUSH_END_POINT, options);
};
PushBullet.prototype.dismissPush = function dismissPush(pushIden) {
    return this.updatePush(pushIden, { dismissed: true });
};
PushBullet.prototype.updatePush = function updatePush(pushIden, updates = {}) {
    const options = {
        json: updates
    };
    return this.makeRequest('post', PushBullet.PUSH_END_POINT + '/' + pushIden, options);
};
PushBullet.prototype.deletePush = function deletePush(pushIden) {
    return this.makeRequest('delete', PushBullet.PUSH_END_POINT + '/' + pushIden, null);
};
PushBullet.prototype.deleteAllPushes = function deleteAllPushes() {
    return this.makeRequest('delete', PushBullet.PUSH_END_POINT, {});
};
//# sourceMappingURL=pushes.js.map