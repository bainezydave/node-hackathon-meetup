const moment = require('moment');

module.exports = {
    truncate: function (str, len)
    {
        if (str.length > len && str.length > 0)
        {
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.legth > 0) ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },

    stripTags: function (txt)
    {
        if (typeof txt == "undefined") return;
        var regexp = new RegExp('#([^\\s]*)', 'g');
        return txt.replace(regexp, '');
    },

    formatDate: function (date, format)
    {
        return moment(date).format(format);
    },

    select: function (value, options)
    {
        return options.fn(this)
            .split('\n')
            .map(function (v)
            {
                var t = 'value="' + value + '"';
                return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"');
            })
            .join('\n');
    },

    editIcon: function (storyUser, loggedUser, storyId, floating = true)
    {
        if (storyUser === loggedUser)
        {
            if (floating)
            {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
            } else
            {
                return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
            }
        } else
        {
            return '';
        }
    }
};
