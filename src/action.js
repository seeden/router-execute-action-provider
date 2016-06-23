export default function (context, payload, done) {
  context.executeAction(payload.action, payload.payload, (err, data) => {
    if (err) {
      context.dispatch('ERROR_HANDLE', {
        error: err,
      });

      if (typeof payload.to === 'function') {
        payload.to(err);
      }

      return done();
    }

    if (!payload.router || !payload.to) {
      return done();
    }

    const to = typeof payload.to === 'function'
      ? payload.to(null, data, payload)
      : payload.to;

    if (to) {
      payload.router.push(to);
    }

    return done();
  });
}
