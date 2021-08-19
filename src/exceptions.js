export function NotImplementedError()
{
    return {
        name: 'NotImplementedError',
        message: 'This method does not have an implementation.'
    };
}

NotImplementedError.prototype = new Error();
