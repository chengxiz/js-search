describe('TokenHighlighter', function() {
  var tag, tokenHighlighter;

  beforeEach(function() {
    tokenHighlighter = new TokenHighlighter();
  });

  it('should handle empty strings', function() {
    var text = '';
    expect(tokenHighlighter.highlight(text, [])).toEqual(text);
  });

  it('should not highlight strings without matches', function() {
    var tokens = ['foo'];
    var text = 'bar baz';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(text);
  });

  it('should highlight tokens that equal the full string', function() {
    var tokens = ['foo'];
    var text = 'foo';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(tokenHighlighter.wrapText_(text));
  });

  it('should not highlight words ending with tokens', function() {
    var tokens = ['bar'];
    var text = 'foobar';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(text);
  });

  it('should highlight multiple matches for multiple tokens', function() {
    var tokens = ['bar', 'baz'];
    var text = 'foo bar baz foo';
    var expectedText = 'foo ' + tokenHighlighter.wrapText_('bar') + ' ' + tokenHighlighter.wrapText_('baz') + ' foo';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });

  it('should highlight the last word in the text', function() {
    var tokens = ['bar'];
    var text = 'foo bar';
    var expectedText = 'foo ' + tokenHighlighter.wrapText_('bar');
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });

  it('should highlight the first word in the text', function() {
    var tokens = ['foo'];
    var text = 'foo bar';
    var expectedText = tokenHighlighter.wrapText_('foo') + ' bar';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });

  it('should highlight tokens within tokens', function() {
    var tokens = ['foo', 'foobar'];
    var text = 'bar foobar baz';
    var expectedText = 'bar ' + tokenHighlighter.wrapText_(tokenHighlighter.wrapText_('foo') + 'bar') + ' baz';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });

  it('should highlight using sanitized text', function() {
    var tokens = ['foo', 'BAR'];
    var text = 'Foo bar baz';
    var expectedText = tokenHighlighter.wrapText_('Foo') + ' ' + tokenHighlighter.wrapText_('bar') + ' baz';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });

  it('should highlight the correct words regardless of leading or trailing spaces', function() {
    var tokens = ['foo', 'baz'];
    var text = '  foo bar baz ';
    var expectedText = '  ' + tokenHighlighter.wrapText_('foo') + ' bar ' + tokenHighlighter.wrapText_('baz') + ' ';
    expect(tokenHighlighter.highlight(text, tokens)).toEqual(expectedText);
  });
});