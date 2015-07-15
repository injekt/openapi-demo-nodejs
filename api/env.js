var env = {
    DEBUG: true
}

if (env.DEBUG) {
    env.corpId = 'dingea786bf7dcce0e0c';
    env.secret = '1UEOPvCHzK2EFRWgkFqM06QTCAozYQXi7bhbXHSW8k_6WuB-nqnQk_cj0fBcrx4f';
}
else {
    env.corpId = 'dingcc2b8da8d41f176f';
    env.secret = 'jHViI9R-JlETwZr5OVmQEuhQ7WggXZAGSaacE9_XIHlsUJeGoeYb2VBB3jE9fYlk';
}

module.exports = env;